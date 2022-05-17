// Import Components
import LoginForm from "../components/LoginForm";

// Import Syntax
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLogin, setLoginSuccess } from '../store/actions/loginAction';

// ## Component Login Page ##
export default function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  // ## Function ##
  const handleRegisterLinkClick = () => {
    history.push('/register');
  };

  const handleHomeClick = () => {
    history.push('/');
  };

  const handleSubmitLogin = () => {
    dispatch(setLogin())
      .then((state) => {
        if (state) {
          history.push('/home');
          dispatch(setLoginSuccess(false));
        }
      })
  };

  // Render Page
  return (
    <>
      <div className="back-to-home rounded d-none d-sm-block">
        <a href="" className="text-white rounded d-inline-block text-center"
        onClick={(e) => handleHomeClick(e)}><i className='bx bx-home-alt'></i></a>
      </div>
      <section id="bg-login" className="vh-100">
        <div className="home-center bg-landing-page">
          <div className="home-desc-center">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6">
                  <div className="login-page bg-white shadow rounded p-4">
                    <div className="text-center">
                      <h3 className="fw-bold">Login To Start Order!</h3>
                    </div>
                    <LoginForm onSignUpClick={handleRegisterLinkClick} onSubmitLogin={handleSubmitLogin}/>
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