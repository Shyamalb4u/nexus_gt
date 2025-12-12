import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useWalletStore from "../hooks/useWallet";
import FlashMessage from "../components/FlashMessage";

export default function Sign() {
  const navigate = useNavigate();
  const [isWallet, setIsWallet] = useState(true);
  const api_link = process.env.REACT_APP_API_URL;
  const receive_address = process.env.REACT_APP_RECEIVE_ADDRESS;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const spn = searchParams.get("r");
  const [refer, setRefer] = useState("");
  const [name, setName] = useState("");
  const [showRegi, setShowRegi] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const {
    connectWallet,
    address,
    isConnected,
    usdtBalance,
    bnbBalance,
    sendUSDT,
    fetchBalances,
  } = useWalletStore();
  const [flash, setFlash] = useState("");

  useEffect(() => {
    if (window.init_iconsax) {
      window.init_iconsax();
    }
  }, []);
  useEffect(() => {
    const eth = window.ethereum;
    if (eth) {
      if (eth.isTrust) {
        console.log("✅ Opened inside Trust Wallet");
        setIsWallet(true);
      } else if (eth.isMetaMask) {
        console.log("✅ Opened inside MetaMask browser");
        setIsWallet(true);
      } else if (eth.isCoinbaseWallet) {
        console.log("✅ Opened inside Coinbase Wallet browser");
        setIsWallet(true);
      } else {
        console.log("✅ Wallet provider found, unknown type");
        setIsWallet(true);
      }
    } else {
      console.log("🌐 Probably a normal browser (Chrome, Safari, etc.)");
      setIsWallet(false);
    }
  }, []);
  useEffect(() => {
    setRefer(spn);
  }, [spn]);
  useEffect(() => {
    async function checkUser() {
      if (isConnected) {
        try {
          let url = api_link + "getUser/" + address;
          const result = await fetch(url);
          const reData = await result.json();

          if (reData.data !== "No Data") {
            navigate("/wallet");
          } else {
            setShowRegi(true);
            console.log("Not a user");
          }
        } catch (e) {
          setShowRegi(true);
          return;
        }
      } else {
        setShowRegi(false);
      }
    }
    checkUser();
  }, [address, isConnected, navigate, api_link]);

  async function onSignup() {
    setIsLoading(true);
    if (!address) {
      setFlash("Please Connect Wallet");
      setIsError(true);
      setIsLoading(false);
      return;
    }
    if (!refer) {
      setFlash("Please come back here by a refer link");
      setIsError(true);
      setIsLoading(false);
      return;
    }
    // # Check sponsor
    console.log(refer);
    try {
      let url = api_link + "getUser/" + refer;
      const result = await fetch(url);
      const reData = await result.json();
      console.log(reData.data);
      console.log(reData.extra);

      if (reData.data === "No Data") {
        setFlash("Invalid Refer Address");
        setIsError(true);
        setIsLoading(false);
        return;
      }
    } catch (e) {
      setFlash("Invalid Refer Address");
      setIsError(true);
      setIsLoading(false);
      return;
    }

    // 1. Check balance
    if (name.length < 4) {
      setFlash("Please Enter Name");
      setIsError(true);
      setIsLoading(false);
      return;
    }
    try {
      if (parseInt(amount) <= 0) {
        setFlash("Enter Amount");
        setIsError(true);
        setIsLoading(false);
        return;
      }
    } catch (e) {
      setFlash("Enter Amount");
      setIsError(true);
      setIsLoading(false);
      return;
    }
    if (parseInt(amount) % 1 !== 0) {
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
    // 2. Check Amount

    // 3. Transfer USDT and get txn
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
    const signUpurl = api_link + "signup";
    const data = {
      spn: refer,
      name: name,
      public: address,
      amt: amount,
      txn: txHash,
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
      if (uid !== "Sponsor Not Exists") {
        setIsLoading(false);
        fetchBalances(address);
        navigate("/wallet");
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
  ////////////////////////
  return (
    <>
      {isWallet && address ? (
        showRegi ? (
          <>
            <header className="main-header">
              <div className="custom-container">
                <div className="header-panel">
                  <h3>Signup</h3>
                </div>
              </div>
            </header>

            <section className="section-lg-t-space section-b-space">
              <div className="custom-container">
                <div className="auth-prograssbar">
                  <div className="progress" role="progressbar">
                    <div
                      className="progress-bar progress-bar-wrapper overflow-visible"
                      style={{ width: "27%" }}
                    >
                      Connected : {String(address).slice(0, 10)}....
                      {String(address).slice(-10)}
                    </div>
                    <img
                      className="img-fluid coin"
                      src="assets/images/gif/coin.gif"
                      alt="coin"
                    />
                  </div>
                </div>

                <div className="auth-form pt-0">
                  <div className="auth-head">
                    <h4 className="fw-medium title-color text-center text-uppercase">
                      About You
                    </h4>
                  </div>
                  <div className="form-group">
                    <label className="form-label mb-2" htmlFor="Inputname">
                      Referred By
                    </label>
                    <div className="form-input">
                      <label className="form-control">
                        {String(refer).slice(0, 10)}.....
                        {String(refer).slice(-10)}
                      </label>
                      <i className="iconsax" data-icon="user-2"></i>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label mb-2" htmlFor="Inputname">
                      Your Name
                    </label>
                    <div className="form-input">
                      <input
                        type="text"
                        className="form-control"
                        id="Inputname"
                        placeholder="Enter your username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <i className="iconsax" data-icon="user-2"></i>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="validationDefault01">
                      Wallet Balance
                    </label>
                    <div className="d-flex gap-2">
                      <div className="form-input w-100">
                        <label className="form-control without-icon">
                          USDT : {String(usdtBalance).slice(0, 7)}
                        </label>
                      </div>
                      <div className="form-input w-100">
                        <label className="form-control without-icon">
                          BNB :{String(bnbBalance).slice(0, 7)}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label mb-2" htmlFor="Inputname">
                      Subscription Amount($)
                    </label>
                    <div className="form-input">
                      <input
                        type="number"
                        className="form-control"
                        id="InputAmount"
                        placeholder="Ex. 25 or multiple of 25"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <i className="iconsax" data-icon="document-text-1"></i>
                    </div>
                  </div>
                </div>
                {!isLoading ? (
                  <button
                    className="btn theme-btn w-100 auth-btn"
                    onClick={() => onSignup()}
                  >
                    Submit
                  </button>
                ) : (
                  <div className="text-center">
                    <img src="/loading.gif" alt="Loading" width={55} />
                  </div>
                )}
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="section-b-space section-lg-t-space">
              <div className="custom-container">
                <div className="empty-page no-connection">
                  <img
                    className="img-fluid"
                    src="https://themes.pixelstrap.com/pwa/fixit/assets/images/no-connection.svg"
                    alt="no-connection"
                  />

                  <h2>Oops! your connection seems off...</h2>
                  <h5 className="mt-2">
                    Click the "Connect" button down below to check again for
                    connection.
                  </h5>
                </div>
              </div>

              <div className="fixed-btn">
                <div className="custom-container">
                  <button
                    className="btn theme-btn w-100"
                    onClick={connectWallet}
                  >
                    Connect
                  </button>
                </div>
              </div>
            </section>
          </>
        )
      ) : (
        <>
          <section className="section-b-space section-lg-t-space">
            <div className="custom-container">
              <div className="empty-page no-connection">
                <img
                  className="img-fluid"
                  src="https://themes.pixelstrap.com/pwa/fixit/assets/images/no-connection.svg"
                  alt="no-connection"
                />

                <h2>Oops! your connection seems off...</h2>
                <h5 className="mt-2">
                  Click the "Connect" button down below to check again for
                  connection.
                </h5>
              </div>
            </div>

            <div className="fixed-btn">
              <div className="custom-container">
                <button className="btn theme-btn w-100" onClick={connectWallet}>
                  Connect
                </button>
              </div>
            </div>
          </section>
        </>
      )}
      <FlashMessage
        message={flash}
        onClose={() => setFlash("")}
        isError={isError}
      />
    </>
  );
}
