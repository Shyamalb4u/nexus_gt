export default function Footer({ activeTab, setActiveTab }) {
  return (
    <div className="navbar-menu">
      <ul>
        <li className={activeTab === "home" ? "active" : ""}>
          <a onClick={() => setActiveTab("home")}>
            <div className="icon">
              <img
                className="unactive"
                src="https://themes.pixelstrap.com/pwa/fixit/assets/images/svg/home.svg"
                alt="home"
              />
              <img
                className="active"
                src="https://themes.pixelstrap.com/pwa/fixit/assets/images/svg/home-fill.svg"
                alt="home"
              />
            </div>
            <h5 className="active">Home</h5>
          </a>
        </li>

        <li className={activeTab === "referral" ? "active" : ""}>
          <a onClick={() => setActiveTab("referral")}>
            <div className="icon">
              <img
                className="unactive"
                src="https://themes.pixelstrap.com/pwa/fixit/assets/images/svg/booking.svg"
                alt="booking"
              />
              <img
                className="active"
                src="https://themes.pixelstrap.com/pwa/fixit/assets/images/svg/booking-fill.svg"
                alt="booking"
              />
            </div>
            <h5>Referral</h5>
          </a>
        </li>

        <li>
          <a onClick={() => setActiveTab("packages")} className="scanner-btn">
            <img
              className="active"
              style={{ color: "white" }}
              src="https://themes.pixelstrap.com/pwa/fixit/assets/images/svg/wallet-open.svg"
              alt="p8"
            />
          </a>
        </li>

        <li className={activeTab === "wallet" ? "active" : ""}>
          <a onClick={() => setActiveTab("wallet")}>
            <div className="icon">
              <img
                className="unactive"
                src="https://themes.pixelstrap.com/pwa/fixit/assets/images/svg/wallet-open.svg"
                alt="wallet"
              />
              <img
                className="active"
                src="https://themes.pixelstrap.com/pwa/fixit/assets/images/svg/wallet-fill.svg"
                alt="wallet"
              />
            </div>
            <h5>Wallet</h5>
          </a>
        </li>

        <li className={activeTab === "community" ? "active" : ""}>
          <a onClick={() => setActiveTab("community")}>
            <div className="icon">
              <img
                className="unactive"
                src="https://themes.pixelstrap.com/pwa/fixit/assets/images/svg/profile.svg"
                alt="profile"
              />
              <img
                className="active"
                src="https://themes.pixelstrap.com/pwa/fixit/assets/images/svg/profile-fill.svg"
                alt="profile"
              />
            </div>
            <h5>Community</h5>
          </a>
        </li>
      </ul>
    </div>
  );
}
