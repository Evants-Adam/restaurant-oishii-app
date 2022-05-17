import { SET_LOGIN, SET_LOGIN_ERROR, SET_LOGIN_SUCCESS } from "../actionTypes";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// # Actions
export function setLoginSuccess(data) {
  return (dispatch) => dispatch(setLoginSuccessModular(data))
};

export function setUpLogin(data) {
  return (dispatch) => dispatch(setLoginModular(data))
};

export function setLogin() {
  return async (dispatch, getState) => {
    const { email, password } = getState().loginReducer;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    };
    
    return fetch(`https://restaurant-oishii-app.herokuapp.com/public/login`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem('access_token', data.access_token);
          dispatch(setLoginSuccessModular(true));

          // # Sweetalert fires
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            title: <strong>Nice!</strong>,
            html: <p>Login Success!</p>,
            icon: 'success'
          });

          return true;
        } else {
          // # Sweetalert fires
          const MySwal = withReactContent(Swal)
          MySwal.fire({
            title: <strong>Ops...</strong>,
            html: <p>{data.message}</p>,
            icon: 'error'
          });

          return false;
        }
      })
      .catch((error) => dispatch(setLoginErrorModular(error)))
  }
};

// # Helper Modular Functions
function setLoginModular (data) {
  return {
    type: SET_LOGIN,
    payload: {
      email: data.email,
      password: data.password
    }
  }
};

function setLoginErrorModular (error) {
  return {
    type: SET_LOGIN_ERROR,
    payload: error
  }
};

function setLoginSuccessModular (success) {
  return {
    type: SET_LOGIN_SUCCESS,
    payload: success
  }
};
