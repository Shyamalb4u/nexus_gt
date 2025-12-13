import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AccountHome from "./AccountHome";
import useWalletStore from "../hooks/useWallet";
import Referral from "./Referral";
import Community from "./Community";
import MyPackages from "./MyPackages";
export default function Wallet() {
  const navigate = useNavigate();
  const api_link = process.env.REACT_APP_API_URL;
  const [page, setPage] = useState(0);
  const [flash, setFlash] = useState("");
  const [activeTab, setActiveTab] = useState("home");

  // const { fetchIncomeData } = dashboardBalance();
  const {
    address,
    isConnected,
    signer,
    bnbBalance,
    usdtBalance,
    fetchBalances,
    getTxStatus,
    disconnectWallet,
  } = useWalletStore();
  useEffect(() => {
    async function checkUser() {
      if (!isConnected) {
        navigate("/");
      }
    }
    checkUser();
  }, [isConnected, navigate]);

  useEffect(() => {
    async function getPendingData() {
      try {
        let url = api_link + "pending_activation/" + address;
        console.log(url);
        const result = await fetch(url);
        const reData = await result.json();

        if (reData.data !== "No Data") {
          for (const pdata of reData.data) {
            try {
              const status = await getTxStatus(pdata.txn);

              if (status === "success") {
                console.log(pdata.txn);
                //set activation status success and calculate income abd achievement
                const buyUpurl = api_link + "booking";
                const data = {
                  txn: pdata.txn,
                  type: "success",
                };
                const customHeaders = {
                  "Content-Type": "application/json",
                };
                try {
                  const result = await fetch(buyUpurl, {
                    method: "POST",
                    headers: customHeaders,
                    body: JSON.stringify(data),
                  });
                  if (!result.ok) {
                    throw new Error(`HTTP error! status: ${result.status}`);
                  }
                } catch (error) {
                  console.log("Error!");
                }
              } else if (status === "failed") {
                const buyUpurl = api_link + "booking";
                const data = {
                  txn: pdata.txn,
                  type: "fail",
                };
                const customHeaders = {
                  "Content-Type": "application/json",
                };
                try {
                  const result = await fetch(buyUpurl, {
                    method: "POST",
                    headers: customHeaders,
                    body: JSON.stringify(data),
                  });
                  if (!result.ok) {
                    throw new Error(`HTTP error! status: ${result.status}`);
                  }
                } catch (error) {
                  console.log("Error!");
                }
              }
            } catch (e) {
              console.log("Error!");
            }
          }
        }
      } catch (e) {
        console.log("Error!");
        return;
      }
    }
    getPendingData();
  }, [address, getTxStatus]);
  return (
    <>
      <Header />
      {activeTab === "home" && <AccountHome />}
      {activeTab === "referral" && <Referral />}
      {activeTab === "community" && <Community />}
      {activeTab === "packages" && <MyPackages />}

      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
}
