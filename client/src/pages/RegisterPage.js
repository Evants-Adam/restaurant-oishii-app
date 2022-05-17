// Import Components
import RegisterForm from "../components/RegisterForm";

// Import Syntax
import { useHistory } from "react-router-dom";
import { postRegister, setRegisterSuccess } from "../store/actions/registerAction";
import { useDispatch } from 'react-redux';

// ## Component Register Page ##
export default function RegisterPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  // ## Function ##
  const handleLoginLinkClick = () => {
    history.push('/login');
  };

  const handleHomeClick = () => {
    history.push('/')
  };

  const handleSubmitRegister = () => {
    dispatch(postRegister())
      .then((state) => {
        if (state) {
          history.push('/login');
          dispatch(setRegisterSuccess(false));
        }
      })
  };

  return (
    <>
      <div>
        <div className="back-to-home rounded d-none d-sm-block">
          <a href="" className="text-white rounded d-inline-block text-center"
          onClick={(e) => handleHomeClick(e)}><i className='bx bx-home-alt'></i></a>
        </div>
        <section id="bg-register" className="vh-100">
          <div className="home-center bg-landing-page">
            <div className="home-desc-center">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-4 col-md-6">
                    <div className="login_page bg-white shadow rounded p-4">
                      <div className="text-center">
                        <h4 className="mb-4 fw-bold">Register as Customer</h4>
                      </div>
                      <RegisterForm onSignInClick={handleLoginLinkClick} onRegisterSubmit={handleSubmitRegister}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}