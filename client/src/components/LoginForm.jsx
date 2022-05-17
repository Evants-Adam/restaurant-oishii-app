// Import Syntax
import { useDispatch, useSelector } from 'react-redux';
import { setUpLogin } from '../store/actions/loginAction';

// ## Component Login Form ##
export default function LoginForm(props) {
  const dispatch = useDispatch();
  const loginState = useSelector(state => state.loginReducer);

  // ## Function ##
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch(setUpLogin({ ...loginState, [name]: value }));
  };
  
  const loginSubmit = (e) => {
    e.preventDefault();
    props.onSubmitLogin()
  };

  const registerLinkClick = (e) => {
    e.preventDefault()
    props.onSignUpClick();
  };

  return (
    <>
      <div>
        <form className="login-form" onSubmit={(e) => loginSubmit(e)}>
          <div className="row">
            <div className="col-lg-12">
              <div className="form-group position-relative">
                <label>Your Email <span className="text-danger">*</span></label>
                <input type="email" className="form-control" placeholder="Email" name="email" required="" onChange={e => handleOnChange(e)}/>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="form-group position-relative">
                <label>Password <span className="text-danger">*</span></label>
                <input type="password" className="form-control" placeholder="Password" name="password" required="" onChange={e => handleOnChange(e)}/>
              </div>
            </div>
            <div className="col-lg-12 mb-0">
              <button className="btn btn-info w-100">Sign in</button>
            </div>
          </div>
        </form>
        <div className="col-lg-12 mt-4 text-center">
          <div className="col-12 text-center">
            <p className="mb-0 mt-3"><small className="text-dark mr-2">Don't have an account ?</small> <a href="" className="text-dark fw-bold"
            onClick={(e) => registerLinkClick(e)}>Sign Up</a></p>
          </div>
        </div>
      </div>
    </>
  )
}