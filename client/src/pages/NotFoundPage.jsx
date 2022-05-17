// Import Syntax
import { useHistory } from "react-router-dom";

// ## Component 404 Page ##
export default function NotFoundPage() {
  const history = useHistory();

  // ## Function ##
  const backLinkClick = (e) => {
    e.preventDefault();
    history.push('/home');
  };

  // Render Page
  return (
    <>
      <section id="bg-login" className="vh-100">
        <div className="home-center bg-landing-page">
          <div className="home-desc-center">
            <div class="container">
              <div class="row justify-content-center mt-5">
                <div class="col-lg-4 col-md-6 mt-5">
                  <div className="login-page bg-white shadow rounded p-4">
                    <div class="text-center fw-bold mt-5">
                      <h2>Page Not Found</h2>
                      <h6>Oopss.. the page you were looking for is not available.</h6>
                        <a href="" class="badge badge-success align-middle" onClick={(e) => backLinkClick(e)}><i class='bx bxs-left-arrow-circle align-middle'></i>Click Here to Back to Home</a>
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