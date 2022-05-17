// Import Syntax
import { useDispatch, useSelector } from 'react-redux';
import { setRegister } from '../store/actions/registerAction';

// ## Component Register Form ##
export default function RegisterForm(props) {
  const dispatch = useDispatch();
  const registerState = useSelector(state => state.registerReducer);

  // ## Function ##
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch(setRegister({ ...registerState, [name]: value }));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    props.onRegisterSubmit();
  };

  const loginLinkClick = (e) => {
    e.preventDefault();
    props.onSignInClick();
  };

  // Render Component
  return (
    <>
      <div>
        <form className="register-form" onSubmit={(e) => registerSubmit(e)}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group position-relative">
                <label>Your Email <span className="text-danger">*</span></label>
                <input type="email" className="form-control" name="email" placeholder="Email" required onChange={e => handleOnChange(e)}/>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group position-relative">
                <label>Password <span className="text-danger">*</span></label>
                <input type="password" className="form-control" name="password" placeholder="Password" required onChange={e => handleOnChange(e)}/>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group position-relative">
                <label>Phone Number <span className="text-danger">*</span></label>
                <input type="text" name="phoneNumber" className="form-control" placeholder="Phone Number" required onChange={e => handleOnChange(e)}/>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group position-relative">
                <label>Address <span className="text-danger">*</span></label>
                <input type="text" name="address" className="form-control" placeholder="Address" required onChange={e => handleOnChange(e)}/>
              </div>
            </div>
            <div className="col-md-12">
              <button className="btn btn-info w-100">Register</button>
            </div>
            <div className="mx-auto text-center">
              <p className="mb-0 mt-3"><small className="text-dark mr-2">Already have an account ?</small> <a href="" className="text-dark fw-bold" onClick={(e) => loginLinkClick(e)}>Sign in</a></p>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}