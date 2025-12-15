import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* <div className="loader-wrapper" id="loader">
        <span className="loader"></span>
      </div> */}

      <section className="section-lg-t-space onboarding-section servicemen-onboarding-section position-relative">
        <div
          className="servicemen-onboarding-image"
          style={{ marginTop: "2px" }}
        >
          <img
            className="img-fluid servicemen-img"
            src="/logo.png"
            alt="Logo"
            style={{ width: "120px" }}
          />
        </div>
        <section className="box-background" style={{ paddingTop: "2px" }}>
          <ul className="booking-list">
            <li className="booking-box" style={{ marginTop: "2px" }}>
              <div className="booking-details">
                <div className="d-flex align-items-center gap-2">
                  <div className="service-content">
                    <div className="d-flex align-items-start gap-2 mb-1">
                      <h5 className="theme-color fw-medium">
                        With Nexus Global Traders, smart earning starts today.
                        Your dreams deserve progress.
                      </h5>
                    </div>
                  </div>
                  <div className="service-img">
                    <img className="img-fluid img" src="/rocket.gif" alt="1" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </section>
        <div className="custom-container">
          <h2 style={{ color: "white", textAlign: "center" }}>
            Nexus Global Traders
          </h2>
          <p style={{ color: "whitesmoke", marginTop: "10px" }}>
            <h5>About Us</h5>
            “Nexus Global Trader offers investors a scalable and professionally
            managed trading opportunity, focused on risk-managed strategies,
            capital efficiency, and consistent value creation in global
            markets.”
          </p>
          <p style={{ color: "whitesmoke", marginTop: "10px" }}>
            <h5>What We Do?</h5>
            “Nexus Global Trader empowers individuals and businesses to unlock
            global market potential through advanced trading strategies,
            professional expertise, and sustainable profit-driven solutions.”
          </p>
        </div>
        <section className="section-b-space">
          <div className="custom-container">
            <div className="title">
              <h3>Our Associates</h3>
            </div>

            <div className="row g-3">
              <div className="col-6">
                <div className="available-servicemen-box">
                  <a href="servicemen-details.html" className="servicemen-img">
                    <img
                      className="img-fluid image w-100"
                      src="/assets/images/profile/p13.png"
                      alt="1"
                    />
                  </a>

                  <div className="service-details">
                    <a href="servicemen-details.html">
                      <h5>Daniel Wong</h5>
                    </a>
                    <h6>Financial Analyst</h6>
                    <p style={{ color: "yellowgreen" }}>
                      “Nexus Global Trader combines technology, expertise, and
                      strategic planning into a comprehensive investment program
                      that aligns well with long-term investor objectives.”
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="available-servicemen-box">
                  <a href="servicemen-details.html" className="servicemen-img">
                    <img
                      className="img-fluid image w-100"
                      src="/assets/images/profile/p4.png"
                      alt="2"
                    />
                  </a>

                  <div className="service-details">
                    <a href="servicemen-details.html">
                      <h5>Michael Anderson</h5>
                    </a>
                    <h6>Portfolio Strategist</h6>
                    <p style={{ color: "yellowgreen" }}>
                      “Nexus Global Trader stands out for its strategic
                      execution and market expertise. The program reflects a
                      deep understanding of global trading dynamics and capital
                      efficiency.”
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="available-servicemen-box">
                  <a href="servicemen-details.html" className="servicemen-img">
                    <img
                      className="img-fluid image w-100"
                      src="/assets/images/profile/p8.png"
                      alt="3"
                    />
                  </a>

                  <div className="service-details">
                    <a href="servicemen-details.html">
                      <h5>Rajiv Malhotra</h5>
                    </a>
                    <h6>Business Consultant</h6>
                    <p style={{ color: "yellowgreen" }}>
                      “Nexus Global Trader provides a well-structured program
                      backed by disciplined strategies and transparency. The
                      professional approach and clear communication give
                      investors strong confidence in long-term growth.”
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="available-servicemen-box">
                  <a href="servicemen-details.html" className="servicemen-img">
                    <img
                      className="img-fluid image w-100"
                      src="/assets/images/profile/p9.png"
                      alt="4"
                    />
                  </a>

                  <div className="service-details">
                    <a href="servicemen-details.html">
                      <h5>Angela Bower</h5>
                    </a>
                    <h6>Entrepreneur</h6>
                    <p style={{ color: "yellowgreen" }}>
                      “The Nexus programs are professionally managed and clearly
                      structured. It is an excellent opportunity for individuals
                      seeking disciplined participation in global financial
                      markets.”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="panel-space"></div>
        <div className="custom-container">
          <div className="servicemen-onboarding-details">
            <div className="mt-3">
              <Link to="/sign" className="btn theme-btn w-100">
                Launch App
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
