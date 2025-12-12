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
            <h4>Get paid by just one click</h4>
            <h5>Now manage all your service & shop by just one click.</h5>
            <div className="mt-3">
              <a href="login.html" className="btn theme-btn w-100">
                Login as provider
              </a>
              <a
                href="https://themes.pixelstrap.com/pwa/fixit/template/servicemen-app/login.html"
                className="btn theme-btn bg-transparent theme-color w-100"
              >
                Login as servicemen
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
