import { useEffect, useState } from "react";
import useWalletStore from "../hooks/useWallet";
import dashboardBalance from "../hooks/dashboardBalance";
import FlashMessage from "../components/FlashMessage";

export default function AccountHome({ activeTab, setActiveTab }) {
  const api_link = process.env.REACT_APP_API_URL;
  const { fetchIncomeData, incomeData } = dashboardBalance();
  const { address, fetchBalances, getTxStatus, usdtBalance, bnbBalance } =
    useWalletStore();
  const [flash, setFlash] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (window.init_iconsax) {
      window.init_iconsax();
    }
  }, []);
  useEffect(() => {
    fetchIncomeData(address);
  }, [fetchIncomeData, address]);
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setFlash("Share Link Copied!");
      setIsError(false);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  async function onWithdraw() {
    if (!address) {
      return;
    }
    setIsLoading(true);
    const data = await fetchIncomeData(address);
    const balance = data[0].balance;
    if (parseFloat(balance) >= 10) {
      const admCh = (balance * 10) / 100;
      const net = balance - admCh;
      //console.log(admCh, net);
      //// First Insert into Database
      const withdrawalUrl = api_link + "withdrawal";
      const dataToSend = {
        publicKey: address,
        amount: balance,
        txn: "Pending Txn",
      };
      const customHeadersTo = {
        "Content-Type": "application/json",
      };
      try {
        const result = await fetch(withdrawalUrl, {
          method: "POST",
          headers: customHeadersTo,
          body: JSON.stringify(dataToSend),
        });

        if (!result.ok) {
          setIsLoading(false);
          setFlash("Withdrawal Failed!");
          setIsError(true);
          throw new Error(`HTTP error! status: ${result.status}`);
        }
        const reData = await result.json();
        const withSl = reData.data[0].withSl;
        /////// Send Real USDT
        const signUpurl = api_link + "withdrawUsdt";
        const data = {
          to: address,
          amount: net,
        };
        const customHeaders = {
          "Content-Type": "application/json",
        };
        try {
          const resultGet = await fetch(signUpurl, {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify(data),
          });

          if (!resultGet.ok) {
            throw new Error(`HTTP error! status: ${resultGet.status}`);
          }
          const reData = await resultGet.json();
          console.log(reData.msg);
          const msg = reData.msg;
          if (msg === "success") {
            const txHash = reData.txHash;
            ///////// Database
            const updateUrl = api_link + "withdrawal_update";
            const updateData = {
              withSl: withSl,
              txn: txHash,
            };
            const updateHeaders = {
              "Content-Type": "application/json",
            };
            try {
              const updatResult = await fetch(updateUrl, {
                method: "POST",
                headers: updateHeaders,
                body: JSON.stringify(updateData),
              });
              if (!updatResult.ok) {
                throw new Error(`HTTP error! status: ${updatResult.status}`);
              }
              const reDatass = await updatResult.json();
            } catch (err) {
              console.log(err);
              setIsLoading(false);
              setFlash("Withdrawal Failed!");
              setIsError(true);
            }
            //// End Database
          }
          fetchIncomeData(address);
          fetchBalances(address);
          setIsLoading(false);
          setFlash("Withdrawal Success");
          setIsError(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
          setFlash("Withdrawal Failed!");
          setIsError(true);
        }
      } catch (error) {
        console.log("Others Error!");
        setIsLoading(false);
      }
      ///////// End Of Database
    } else {
      setIsLoading(false);
      setFlash("Minimum Withdrawal $10");
      setIsError(true);
    }
  }
  return (
    <>
      <section className="section-lg-t-space">
        <div className="custom-container">
          <div className="wallet-balance-box">
            <img
              className="img-fluid wallet-icon"
              src="https://themes.pixelstrap.com/pwa/fixit/assets/images/svg/wallet-open.svg"
              alt="p8"
            />
            <div className="wallet-details">
              <div>
                <h5>Account Balance.</h5>
                <h4>${incomeData ? <>{incomeData[0].balance}</> : "..."}</h4>
              </div>
              {!isLoading ? (
                <a
                  className="btn-sm theme-btn withdraw-btn theme-color"
                  onClick={() => onWithdraw()}
                >
                  Withdraw
                </a>
              ) : (
                <div className="text-center">
                  <img src="/loading.gif" alt="Loading" width={55} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="section-b-space">
        <div className="custom-container">
          <div className="row g-3">
            <div className="col-7">
              <a href="earnings.html" className="provider-counter-box">
                <i className="iconsax counter-icon" data-icon="money-in"></i>
                <div className="provider-counter-details">
                  <h6>Total Investment</h6>
                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <h4>
                      ${incomeData ? <>{incomeData[0].totalInv}</> : "..."}
                    </h4>
                    <i
                      className="iconsax arrow-icon"
                      data-icon="arrow-right"
                    ></i>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-5">
              <a href="booking.html" className="provider-counter-box">
                <i
                  className="iconsax counter-icon"
                  data-icon="receipt-minus-1"
                ></i>
                <div className="provider-counter-details">
                  <h6>Total Earning</h6>
                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <h4>${incomeData ? <>{incomeData[0].totInc}</> : "..."}</h4>
                    <i
                      className="iconsax arrow-icon"
                      data-icon="arrow-right"
                    ></i>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-5">
              <a
                onClick={() => setActiveTab("roi")}
                className="provider-counter-box"
              >
                <i className="iconsax counter-icon" data-icon="grid-apps"></i>
                <div className="provider-counter-details">
                  <h6>Trading Profit</h6>
                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <h4>
                      ${incomeData ? <>{incomeData[0].shareInc}</> : "..."}
                    </h4>
                    <i
                      className="iconsax arrow-icon"
                      data-icon="arrow-right"
                    ></i>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-7">
              <a
                onClick={() => setActiveTab("referralBonus")}
                className="provider-counter-box"
              >
                <i className="iconsax counter-icon" data-icon="grid-apps"></i>
                <div className="provider-counter-details">
                  <h6>Referral Bonus</h6>
                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <h4>${incomeData ? <>{incomeData[0].spnInc}</> : "..."}</h4>
                    <i
                      className="iconsax arrow-icon"
                      data-icon="arrow-right"
                    ></i>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-7">
              <a
                onClick={() => setActiveTab("communityBonus")}
                className="provider-counter-box"
              >
                <i className="iconsax counter-icon" data-icon="grid-apps"></i>
                <div className="provider-counter-details">
                  <h6>Community Bonus</h6>
                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <h4>
                      ${incomeData ? <>{incomeData[0].commInc}</> : "..."}
                    </h4>
                    <i
                      className="iconsax arrow-icon"
                      data-icon="arrow-right"
                    ></i>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-5">
              <a className="provider-counter-box">
                <i className="iconsax counter-icon" data-icon="grid-apps"></i>
                <div className="provider-counter-details">
                  <h6>MFA Bonus</h6>
                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <h4>
                      ${incomeData ? <>{incomeData[0].leaderInc}</> : "..."}
                    </h4>
                    <i
                      className="iconsax arrow-icon"
                      data-icon="arrow-right"
                    ></i>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-5">
              <a className="provider-counter-box">
                <i className="iconsax counter-icon" data-icon="grid-apps"></i>
                <div className="provider-counter-details">
                  <h6>One Time Bonus</h6>
                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <h4>${incomeData ? <>{incomeData[0].achInc}</> : "..."}</h4>
                    <i
                      className="iconsax arrow-icon"
                      data-icon="arrow-right"
                    ></i>
                  </div>
                </div>
              </a>
            </div>

            <div className="col-7">
              <a className="provider-counter-box">
                <i className="iconsax counter-icon" data-icon="grid-apps"></i>
                <div className="provider-counter-details">
                  <h6>Royalty Bonus</h6>
                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <h4>
                      ${incomeData ? <>{incomeData[0].partnerInc}</> : "..."}
                    </h4>
                    <i
                      className="iconsax arrow-icon"
                      data-icon="arrow-right"
                    ></i>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="box-background section-b-space">
        <ul className="booking-list">
          <li className="booking-box">
            <div className="booking-details">
              <div className="d-flex align-items-center gap-2">
                <div className="service-content">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <h5 className="theme-color fw-medium">
                      Refer Link : https://nexusglobaltrader.com/sign?r=
                      {String(address).slice(0, 10)}
                      ......
                      <button
                        class="btn btn-sm outline-btn w-20"
                        onClick={() =>
                          copyToClipboard(
                            `https://nexusglobaltrader.com/#/sign?r=${address}`
                          )
                        }
                      >
                        Copy
                      </button>
                    </h5>
                  </div>
                  <a href="pending-booking-details.html">
                    <h4 className="title-color fw-medium">
                      Income Limit Status
                    </h4>
                  </a>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <h3 className="title-color fw-bold ">
                      Limit ${incomeData ? <>{incomeData[0].capp}</> : "..."}
                    </h3>
                    <h6 className="success-color fw-medium">
                      (Earned{" "}
                      {incomeData ? <>{incomeData[0].incPerc}</> : "..."}
                      %)
                    </h6>
                  </div>
                </div>
                <div className="service-img">
                  <img className="img-fluid img" src="/growth.gif" alt="1" />
                </div>
              </div>
              <div className="line-box">
                <div className="dot1"></div>
                <div className="dot2"></div>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-2">
                <h6 className="fw-medium content-color">Registration</h6>
                <h6 className="fw-medium title-color">
                  {incomeData ? <>{incomeData[0].date}</> : "..."}
                </h6>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <h6 className="fw-medium content-color">MFA Achievement</h6>
                <h6 className="booking-tag pending-bg">
                  {incomeData ? (
                    <>
                      {parseFloat(incomeData[0].leaderInc) > 0
                        ? "Achieved"
                        : "Not Achieved"}
                    </>
                  ) : (
                    "..."
                  )}
                </h6>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <h6 className="fw-medium content-color">One Time Bonus</h6>
                <h6 className="booking-tag pending-bg">
                  {incomeData ? (
                    <>
                      {parseFloat(incomeData[0].achInc) > 0
                        ? "Achieved"
                        : "Not Achieved"}
                    </>
                  ) : (
                    "..."
                  )}
                </h6>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <h6 className="fw-medium content-color">Royalty Status</h6>
                <h6 className="booking-tag pending-bg">
                  {incomeData ? (
                    <>
                      {parseFloat(incomeData[0].partnerInc) > 0
                        ? "Achieved"
                        : "Not Achieved"}
                    </>
                  ) : (
                    "..."
                  )}
                </h6>
              </div>

              <div className="d-flex align-items-center justify-content-between mt-2">
                <h4 className="title-color fw-medium">USDT Balance</h4>
                <h4 className="title-color fw-medium">{usdtBalance}</h4>
              </div>

              <div className="d-flex align-items-center justify-content-between mt-2">
                <h4 className="title-color fw-medium">BNB Balance</h4>
                <h4 className="title-color fw-medium">{bnbBalance}</h4>
              </div>

              <ul className="booking-provider-list">
                <li className="booking-provider-box">
                  <div className="provider-image">
                    <img
                      className="img-fluid provider-pic"
                      src="/p-star.gif"
                      alt="p17"
                    />
                  </div>

                  <div className="provider-content">
                    <div>
                      <h6 className="content-color fw-medium">
                        {incomeData ? (
                          <>
                            {String(incomeData[0].powerAddress).slice(0, 10)}...
                            {String(incomeData[0].powerName).slice(0, 10)}
                          </>
                        ) : (
                          "..."
                        )}{" "}
                      </h6>
                      <h5 className="name fw-medium title-color mt-1">
                        Power Leg
                      </h5>
                    </div>
                    <h6 className="fw-normal title-color ps-2">
                      ${incomeData ? <>{incomeData[0].power}</> : "..."}
                    </h6>
                  </div>
                </li>
              </ul>
              <ul className="booking-provider-list">
                <li className="booking-provider-box">
                  <div className="provider-image">
                    <img
                      className="img-fluid provider-pic"
                      src="/w-star.gif"
                      alt="p17"
                    />
                  </div>

                  <div className="provider-content">
                    <div>
                      <h6 className="content-color fw-medium">
                        All except Power
                      </h6>
                      <h5 className="name fw-medium title-color mt-1">
                        Weeker Leg
                      </h5>
                    </div>
                    <h6 className="fw-normal title-color ps-2">
                      ${incomeData ? <>{incomeData[0].weaker}</> : "..."}
                    </h6>
                  </div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </section>

      <div className="panel-space"></div>
      <FlashMessage
        message={flash}
        onClose={() => setFlash("")}
        isError={isError}
      />
    </>
  );
}
