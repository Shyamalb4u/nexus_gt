import { useEffect, useState } from "react";
import useWalletStore from "../hooks/useWallet";

export default function Header() {
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
          {/* <div class="profile-background">
            <div class="profile-part p-0">
              <div class="profile-image">
                <img
                  id="output"
                  class="img-fluid profile-pic"
                  src="/assets/images/profile/p11.png"
                  alt="11"
                />
              </div>

              <h3>Smitha Williams</h3>
              <h4>smithwilliams452@gmail.com</h4>
            </div>
          </div> */}

          <ul class="profile-list">
            <li>
              <a
                href="https://themes.pixelstrap.com/pwa/fixit/template/user-app/index.html"
                class="setting-box"
              >
                <div class="setting-icon">
                  <i class="iconsax main-icon" data-icon="user-2">
                    {" "}
                  </i>
                </div>
                <div class="setting-content">
                  <h5>User App</h5>
                  <i class="iconsax arrow" data-icon="chevron-right"></i>
                </div>
              </a>
            </li>
            <li>
              <a href="index.html" class="setting-box">
                <div class="setting-icon">
                  <img
                    class="img-fluid main-icon main-img"
                    src="https://themes.pixelstrap.com/pwa/fixit/assets/images/svg/provider-app.svg"
                    alt="provider-app"
                  />
                </div>
                <div class="setting-content">
                  <h5>Provider App</h5>
                  <i class="iconsax arrow" data-icon="chevron-right"></i>
                </div>
              </a>
            </li>
            <li>
              <a
                href="https://themes.pixelstrap.com/pwa/fixit/template/servicemen-app/index.html"
                class="setting-box"
              >
                <div class="setting-icon">
                  <img
                    class="img-fluid main-icon main-img"
                    src="https://themes.pixelstrap.com/pwa/fixit/assets/images/svg/servicemen-app.svg"
                    alt="servicemen-app"
                  />
                </div>
                <div class="setting-content">
                  <h5>Servicemen App</h5>
                  <i class="iconsax arrow" data-icon="chevron-right"></i>
                </div>
              </a>
            </li>

            <li>
              <a href="page-listing.html" class="setting-box">
                <div class="setting-icon">
                  <i class="iconsax main-icon" data-icon="book-closed">
                    {" "}
                  </i>
                </div>
                <div class="setting-content">
                  <h5>Template Pages</h5>
                  <i class="iconsax arrow" data-icon="chevron-right"></i>
                </div>
              </a>
            </li>

            <li>
              <a
                href="https://themes.pixelstrap.com/pwa/fixit/template/elements/elements-page.html"
                class="setting-box"
              >
                <div class="setting-icon">
                  <i class="iconsax main-icon" data-icon="document-text-1">
                    {" "}
                  </i>
                </div>
                <div class="setting-content">
                  <h5> Template Elements</h5>
                  <i class="iconsax arrow" data-icon="chevron-right"></i>
                </div>
              </a>
            </li>

            <li>
              <div class="setting-box">
                <div class="setting-icon">
                  <i class="iconsax main-icon" data-icon="repeat">
                    {" "}
                  </i>
                </div>
                <div class="setting-content">
                  <h5>RTL</h5>
                  <div class="switch-btn">
                    <input id="dir-switch" type="checkbox" />
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div class="setting-box">
                <div class="setting-icon">
                  <i class="iconsax main-icon" data-icon="brush-3">
                    {" "}
                  </i>
                </div>
                <div class="setting-content">
                  <h5>Dark</h5>
                  <div class="switch-btn">
                    <input id="dark-switch" type="checkbox" />
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <div class="bottom-sidebar">
            <a href="login.html" class="pages">
              <i class="iconsax sidebar-icon" data-icon="logout-2">
                {" "}
              </i>
              <h3>Logout</h3>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
