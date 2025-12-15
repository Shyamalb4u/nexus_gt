import { useEffect, useState } from "react";
import useWalletStore from "../hooks/useWallet";

export default function IncomeStatement({ apiStr, heading }) {
  const api_link = process.env.REACT_APP_API_URL;
  const [statementData, setStatementData] = useState([]);
  const { address } = useWalletStore();
  useEffect(() => {
    console.log(apiStr);
    async function getPackages() {
      try {
        let url = api_link + "getIncomeStatement/" + address + "/" + apiStr;
        console.log(url);
        const result = await fetch(url);
        const reData = await result.json();
        setStatementData(reData.data);
      } catch (e) {
        console.log("Error!");
        return;
      }
    }
    getPackages();
  }, [address, apiStr, api_link]);
  return (
    <>
      <section className=" section-b-space section-lg-t-space">
        <div className="custom-container">
          <div className="header-panel">
            <h3 style={{ textAlign: "center", color: "white" }}>{heading}</h3>
          </div>

          <ul className="commission-details-list">
            {statementData.length > 0 ? (
              <>
                {statementData.map((data, index) => (
                  <li key={data.Member_sl} className="commission-details-box">
                    <div className="booking-id-head">
                      <div>
                        <h5 className="fw-medium title-color">{data.FOLIO}</h5>
                        <h6 className="fw-normal content-color mt-1">
                          {data.DETAILS.length > 27
                            ? String(data.DETAILS).slice(0, 27) + "..."
                            : data.DETAILS}
                        </h6>
                        {data.FOLIO !== "Level Income" ? (
                          <h6 className="fw-normal content-color mt-1">
                            {data.DATES}
                          </h6>
                        ) : (
                          ""
                        )}
                      </div>
                      <h6 className="booking-id">${data.CREDIT}</h6>
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
