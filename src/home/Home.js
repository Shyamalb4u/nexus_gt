import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* <div className="loader-wrapper" id="loader">
        <span className="loader"></span>
      </div> */}

      <section className="section-lg-t-space onboarding-section servicemen-onboarding-section position-relative">
        <div className="servicemen-onboarding-image">
          <img
            className="img-fluid servicemen-img"
            src="https://themes.pixelstrap.com/pwa/fixit/assets/images/authantication/provider-img.svg"
            alt="servicemen-img"
          />
        </div>
        <div className="custom-container">
          <div className="servicemen-onboarding-details">
            <h4>Nexus Global Traders</h4>
            <h5>
              With Nexus Global Traders, smart earning starts today. Your dreams
              deserve progress.
            </h5>
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
