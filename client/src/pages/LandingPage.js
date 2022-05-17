// Import Syntax
import { useHistory } from "react-router-dom";

// ## Component Login Page ##
export default function LandingPage() {
  const history = useHistory();

  // ## Function ##
  const startLinkClick = (e) => {
    e.preventDefault();
    history.push('/home');
  };

  // Render Page
  return (
    <>
      <section id="bg-login" className="vh-100">
        <div className="home-center bg-landing-page">
          <div className="home-desc-center">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6">
                  <div className="login-page bg-white shadow rounded p-4">
                    <div className="text-center">
                      <h2 className="fw-bold">Welcome to Oishii Restaurant!!</h2>
                    </div>
                    <div>
                      <div className="col-lg-12 mt-4 text-center">
                        <div className="col-12 text-center">
                          <h5 className="mb-0 mt-3"><small className="text-dark mr-2">Click here to see our menu!</small> <a href="" className="btn btn-primary rounded-pill btn-sm" 
                          onClick={(e) => startLinkClick(e)}>Click Me!</a></h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}