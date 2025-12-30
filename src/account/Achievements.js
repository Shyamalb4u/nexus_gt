import { useEffect, useState } from "react";
import useWalletStore from "../hooks/useWallet";
export default function Achievements() {
  const api_link = process.env.REACT_APP_API_URL;
  const [statementData, setStatementData] = useState([]);
  const [onetimeData, setOnetimeData] = useState([]);
  const [royaltyData, setRoyaltyData] = useState([]);
  const { address } = useWalletStore();

  useEffect(() => {
    async function getMfa() {
      try {
        let url =
          api_link + "getIncomeStatement/" + address + "/mfaAchievement";
        console.log(url);
        const result = await fetch(url);
        const reData = await result.json();
        setStatementData(reData.data);
      } catch (e) {
        console.log("Error!");
        return;
      }
    }
    async function getOnetime() {
      try {
        let url =
          api_link + "getIncomeStatement/" + address + "/onetimeAchievement";
        console.log(url);
        const result = await fetch(url);
        const reData = await result.json();
        setOnetimeData(reData.data);
      } catch (e) {
        console.log("Error!");
        return;
      }
    }
    async function getRoyalty() {
      try {
        let url =
          api_link + "getIncomeStatement/" + address + "/royaltyAchievement";
        console.log(url);
        const result = await fetch(url);
        const reData = await result.json();
        setRoyaltyData(reData.data);
      } catch (e) {
        console.log("Error!");
        return;
      }
    }
    getMfa();
    getOnetime();
    getRoyalty();
  }, [address, api_link]);
  return (
    <>
      <section className=" section-b-space section-lg-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <h3 style={{ textAlign: "center", color: "white" }}>
              MFA Achievement
            </h3>
          </div>

          <ul className="commission-details-list">
            {statementData.length > 0 ? (
              <>
                {statementData.map((data, index) => (
                  <li key={data.award_sl} className="commission-details-box">
                    <div className="booking-id-head">
                      <div>
                        <h5 className="fw-medium title-color">{data.dates}</h5>
                        <h6 className="fw-normal content-color mt-1">
                          Slab: {data.lvl} | Target :${data.target} (40:60)
                        </h6>
                      </div>
                      <div>
                        <h6 className="booking-id">${data.comm}</h6>
                        <h6 className="fw-normal content-color mt-1">
                          Monthly
                        </h6>
                      </div>
                    </div>
                  </li>
                ))}
              </>
            ) : (
              <li className="commission-details-box">
                <h6 className="fw-normal content-color text-center mt-1">
                  No Achievement
                </h6>{" "}
              </li>
            )}
          </ul>
          <div className="header-panel">
            <h3 style={{ textAlign: "center", color: "white" }}>
              One Time Reward
            </h3>
          </div>

          <ul className="commission-details-list">
            {onetimeData.length > 0 ? (
              <>
                {onetimeData.map((data, index) => (
                  <li key={data.award_sl} className="commission-details-box">
                    <div className="booking-id-head">
                      <div>
                        <h5 className="fw-medium title-color">{data.dates}</h5>
                        <h6 className="fw-normal content-color mt-1">
                          Target :${data.target} (50:50)
                        </h6>
                      </div>
                      <div>
                        <h6 className="booking-id">{data.award}</h6>
                        <h6 className="fw-normal content-color mt-1">
                          {data.status}
                        </h6>
                      </div>
                    </div>
                  </li>
                ))}
              </>
            ) : (
              <li className="commission-details-box">
                <h6 className="fw-normal content-color text-center mt-1">
                  No Achievement
                </h6>{" "}
              </li>
            )}
          </ul>
          <div className="header-panel">
            <h3 style={{ textAlign: "center", color: "white" }}>
              Royalty Status
            </h3>
          </div>

          <ul className="commission-details-list">
            {royaltyData.length > 0 ? (
              <>
                {royaltyData.map((data, index) => (
                  <li key={data.award_sl} className="commission-details-box">
                    <div className="booking-id-head">
                      <div>
                        <h5 className="fw-medium title-color">Achieved</h5>
                      </div>
                      <div>
                        <h6 className="booking-id">{data.dates}</h6>
                      </div>
                    </div>
                  </li>
                ))}
              </>
            ) : (
              <li className="commission-details-box">
                <h6 className="fw-normal content-color text-center mt-1">
                  No Achievement
                </h6>{" "}
              </li>
            )}
          </ul>
        </div>
      </section>
      <div className="panel-space"></div>
    </>
  );
}
