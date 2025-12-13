import { useEffect, useState } from "react";
import useWalletStore from "../hooks/useWallet";
export default function Community() {
  const api_link = process.env.REACT_APP_API_URL;
  const [statementData, setStatementData] = useState([]);
  const { address } = useWalletStore();
  useEffect(() => {
    async function getPackages() {
      try {
        let url = api_link + "getDownline/" + address;
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
              My Community
            </h3>
          </div>

          <ul className="commission-details-list">
            {statementData.length > 0 ? (
              <>
                {statementData.map((data, index) => (
                  <li key={data.lvl} className="commission-details-box">
                    <div className="booking-id-head">
                      <h6 className="booking-id">Level:{data.lvl}</h6>
                      <div>
                        <h5 className="fw-medium title-color">${data.busi}</h5>
                        <h6 className="fw-normal content-color mt-1">
                          Team: {data.team}
                        </h6>
                      </div>
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
