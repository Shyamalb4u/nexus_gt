import { useEffect, useState } from "react";
import useWalletStore from "../hooks/useWallet";

export default function WithdrawalStatement() {
  const api_link = process.env.REACT_APP_API_URL;
  const [statementData, setStatementData] = useState([]);
  const { address } = useWalletStore();
  useEffect(() => {
    async function getPackages() {
      try {
        let url = api_link + "getIncomeStatement/" + address + "/Withdrawal";
        const result = await fetch(url);
        const reData = await result.json();
        setStatementData(reData.data);
      } catch (e) {
        console.log("Error!");
        return;
      }
    }
    getPackages();
  }, [address]);
  return (
    <>
      <section className=" section-b-space section-lg-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <h3 style={{ textAlign: "center", color: "white" }}>
              Withdrawal Statement
            </h3>
          </div>

          <ul className="commission-details-list">
            {statementData.length > 0 ? (
              <>
                {statementData.map((data, index) => (
                  <li key={data.WITHDRA_SL} className="commission-details-box">
                    <div className="booking-id-head">
                      <div>
                        <h5 className="fw-medium title-color">{data.dates}</h5>
                        <h6 className="fw-normal content-color mt-1">
                          Txn. : {String(data.TXN).slice(0, 16)}....
                        </h6>
                        <h6 className="fw-normal content-color mt-1">
                          Amount : {data.AMOUNT}
                        </h6>
                        <h6 className="fw-normal content-color mt-1">
                          Admin Ch. : {data.ADMIN_CH}
                        </h6>
                      </div>
                      <h6 className="booking-id">${data.NET}</h6>
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
      <div className="panel-space"></div>
    </>
  );
}
