import { useEffect, useState } from "react";
import useWalletStore from "../hooks/useWallet";

export default function Header({ activeTab, setActiveTab }) {
  const [name, setName] = useState("");
  const { address } = useWalletStore();
  const api_link = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (window.init_iconsax) {
      window.init_iconsax();
    }
  }, []);
  useEffect(() => {
    async function getData() {
      try {
        let url = api_link + "getUser/" + address;
        const result = await fetch(url);
        const reData = await result.json();

        if (reData.data !== "No Data") {
          setName(reData.data[0].NAMES);
        }
      } catch (e) {
        console.log("Error");
      }
    }
    getData();
  }, [address, api_link]);
  return (
    <>
      <header className="header">
        <div className="custom-container">
          <div className="head-content">
            <a
              href="#sidebar"
              className="sidebar-btn"
              data-bs-toggle="offcanvas"
            >
              <i className="iconsax" data-icon="text-align-left"></i>
            </a>
            <div className="header-location">
              <img
                className="img-fluid profile-icon"
                src="https://themes.pixelstrap.com/pwa/fixit/assets/images/svg/provider-vector-img.svg"
                alt="location"
              />
              <div className="location-content">
                <h5>Hello, {name}</h5>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <img src="/logo.png" alt="Nexus Logo" />
            </div>
          </div>
        </div>
      </header>
      <div
        class="offcanvas sidebar-offcanvas offcanvas-start"
        tabindex="-1"
        id="sidebar"
      >
        <div class="offcanvas-header sidebar-header">
          <div class="sidebar-logo">
            <img
              class="img-fluid logo"
              src="../../assets/images/logo/logo.png"
              alt="logo"
            />
            <img class="img-fluid logo-dark" src="/logo.png" alt="logo" />
          </div>
        </div>
        <div class="offcanvas-body">
          <ul class="profile-list">
            <li>
              <a
                class="setting-box"
                onClick={() => {
                  setActiveTab("home");
                  const sidebar = document.getElementById("sidebar");
                  const bsOffcanvas =
                    window.bootstrap.Offcanvas.getInstance(sidebar);

                  if (bsOffcanvas) {
                    bsOffcanvas.hide();
                  }
                }}
              >
                <div class="setting-icon">
                  <i class="iconsax main-icon" data-icon="user-2">
                    {" "}
                  </i>
                </div>
                <div class="setting-content">
                  <h5>Deposit History</h5>
                  <i class="iconsax arrow" data-icon="chevron-right"></i>
                </div>
              </a>
            </li>
            <li>
              <a
                class="setting-box"
                onClick={() => {
                  setActiveTab("withdrawalH");
                  const sidebar = document.getElementById("sidebar");
                  const bsOffcanvas =
                    window.bootstrap.Offcanvas.getInstance(sidebar);

                  if (bsOffcanvas) {
                    bsOffcanvas.hide();
                  }
                }}
              >
                <div class="setting-icon">
                  <img
                    class="img-fluid main-icon main-img"
                    src="https://themes.pixelstrap.com/pwa/fixit/assets/images/svg/provider-app.svg"
                    alt="provider-app"
                  />
                </div>
                <div class="setting-content">
                  <h5>Withdrawal History</h5>
                  <i class="iconsax arrow" data-icon="chevron-right"></i>
                </div>
              </a>
            </li>
            <li>
              <a
                class="setting-box"
                onClick={() => {
                  setActiveTab("home");
                  const sidebar = document.getElementById("sidebar");
                  const bsOffcanvas =
                    window.bootstrap.Offcanvas.getInstance(sidebar);

                  if (bsOffcanvas) {
                    bsOffcanvas.hide();
                  }
                }}
              >
                <div class="setting-icon">
                  <img
                    class="img-fluid main-icon main-img"
                    src="https://themes.pixelstrap.com/pwa/fixit/assets/images/svg/servicemen-app.svg"
                    alt="servicemen-app"
                  />
                </div>
                <div class="setting-content">
                  <h5>Achievement History</h5>
                  <i class="iconsax arrow" data-icon="chevron-right"></i>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
