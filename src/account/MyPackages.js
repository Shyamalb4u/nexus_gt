import { useEffect, useState } from "react";
import useWalletStore from "../hooks/useWallet";
import FlashMessage from "../components/FlashMessage";

export default function MyPackages() {
  const api_link = process.env.REACT_APP_API_URL;
  const receive_address = process.env.REACT_APP_RECEIVE_ADDRESS;
  const [statementData, setStatementData] = useState([]);
  const { address, usdtBalance, bnbBalance, sendUSDT, fetchBalances } =
    useWalletStore();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [isError, setIsError] = useState(false);
  const [flash, setFlash] = useState("");

  async function getPackages() {
    try {
      let url = api_link + "getMyPackages/" + address;
      const result = await fetch(url);
      const reData = await result.json();
      setStatementData(reData.data);
    } catch (e) {
      console.log("Error!");
      return;
    }
  }

  useEffect(() => {
    getPackages();
  }, [getPackages]);
  async function onTopup() {
    setIsLoading(true);
    if (!address) {
      setFlash("Please Connect Wallet");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    // 1. Check balance
    if (parseInt(amount) <= 0) {
      setFlash("Select Subscription Amount");
      setIsError(true);
      setIsLoading(false);
      return;
    }
    if (parseInt(amount) % 25 !== 0) {
      setFlash("Amount 25 or multiple of 25");
      setIsError(true);
      setIsLoading(false);
      return;
    }
    if (parseFloat(amount) > parseFloat(usdtBalance)) {
      setFlash("You have not enough balance");
      setIsError(true);
      setIsLoading(false);
      return;
    }
    if (parseFloat(bnbBalance) <= 0) {
      setFlash("BNB Required for GAS Fee");
      setIsError(true);
      setIsLoading(false);
      return;
    }
    // 2. Transfer USDT and get txn
    var txHash = "";
    try {
      txHash = await sendUSDT(receive_address, amount.toString());
    } catch (err) {
      console.error(err);
      setFlash("Transaction Error");
      setIsError(true);
      setIsLoading(false);
      return;
    }
    // 3. Then insert to database
    const signUpurl = api_link + "topup";
    const data = {
      publicKey: address,
      amt: amount,
      txn: txHash,
      mode: "user",
    };
    const customHeaders = {
      "Content-Type": "application/json",
    };
    try {
      const result = await fetch(signUpurl, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
      });

      if (!result.ok) {
        setIsLoading(false);
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const reData = await result.json();
      const uid = reData.data[0].uid;
      if (uid === "OK") {
        setIsLoading(false);
        fetchBalances(address);
        getPackages();
        setAmount(0);
        setFlash("Subcription Successful");
        setIsError(false);
      } else {
        setFlash("Sponsor Not Exists");
        setIsError(true);
        setIsLoading(false);
        console.log("Sponsor Not Exists");
      }
      //console.log(reData);
    } catch (error) {
      console.log("Others Error!");
      setIsLoading(false);
    }
  }
  return (
    <>
      <section className=" section-b-space section-lg-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <h3 style={{ textAlign: "center", color: "white" }}>
              New Deposits
            </h3>
          </div>
          <div className="form-group">
            <h6 style={{ textAlign: "center", color: "white" }}>
              Topup Amount($)
            </h6>

            <div className="form-input">
              <input
                type="number"
                className="form-control"
                id="InputAmount"
                placeholder="Ex. 25 or multiple of 25"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {!isLoading ? (
                <button
                  className="btn theme-btn w-100 auth-btn"
                  style={{ marginTop: "5px" }}
                  onClick={() => onTopup()}
                >
                  Submit
                </button>
              ) : (
                <div className="text-center">
                  <img src="/loading.gif" alt="Loading" width={55} />
                </div>
              )}
            </div>
          </div>
          <div className="header-panel">
            <h3 style={{ textAlign: "center", color: "white" }}>My Deposits</h3>
          </div>
          <ul className="commission-details-list">
            {statementData.length > 0 ? (
              <>
                {statementData.map((data, index) => (
                  <li
                    key={data.Activation_sl}
                    className="commission-details-box"
                  >
                    <div className="booking-id-head">
                      <div>
                        <h5 className="fw-medium title-color">
                          Txn. : {String(data.txn).slice(0, 10)}....
                          {String(data.txn).slice(-10)}
                        </h5>
                        <h6 className="fw-normal content-color mt-1">
                          Status : {data.status}
                        </h6>
                        <h6 className="fw-normal content-color mt-1">
                          {data.DATES}
                        </h6>
                      </div>
                      <h6 className="booking-id">${data.AMOUNT}</h6>
                    </div>
                  </li>
                ))}
              </>
            ) : (
              "No Data"
            )}
          </ul>
        </div>
      </section>
      <FlashMessage
        message={flash}
        onClose={() => setFlash("")}
        isError={isError}
      />
    </>
  );
}
