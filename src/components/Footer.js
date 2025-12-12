export default function Footer() {
  return (
    <div className="navbar-menu">
      <ul>
        <li className="active">
          <a href="home.html">
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

        <li>
          <a href="booking.html">
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
            <h5>Booking</h5>
          </a>
        </li>

        <li>
          <a href="#add-modal" className="scanner-btn" data-bs-toggle="modal">
            <i className="iconsax icon-btn" data-icon="add"></i>
          </a>
        </li>

        <li>
          <a href="wallet.html">
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

        <li>
          <a href="profile.html">
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
            <h5>Profile</h5>
          </a>
        </li>
      </ul>
    </div>
  );
}
