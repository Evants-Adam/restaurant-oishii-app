import { SET_REGISTER, SET_REGISTER_SUCCESS, SET_REGISTER_ERROR } from "../actionTypes";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// # Actions
export function setRegister(data) {
  return (dispatch) => dispatch(setRegisterModular(data))
};

export function setRegisterSuccess(data) {
  return (dispatch) => dispatch(setRegisterSuccessModular(data))
};

export function postRegister() {
  return async (dispatch, getState) => {
    const { email, password, phoneNumber, address } = getState().registerReducer;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, phoneNumber, address })
    }
    
    return fetch('https://restaurant-oishii-app.herokuapp.com/public/register', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.email) {
          dispatch(setRegisterModular({
            payload: {
              email: '',
              password: '',
              phoneNumber: '',
              address: ''
            }
          }))

          dispatch(setRegisterSuccessModular(true))

          // # Sweetalert fires
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            title: <strong>Nice!</strong>,
            html: <p>Register Success!</p>,
            icon: 'success'
          });

          return true;
        } else {
          // # Sweetalert fires
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            title: <strong>Ops...</strong>,
            html: <p>{data.message}</p>,
            icon: 'error'
          });

          return false;
        }
      })
      .catch((error) => dispatch(setRegisterErrorModular(error)))
  }
}

// # Helper Modular Functions
function setRegisterModular (data) {
  return {
    type: SET_REGISTER,
    payload: {
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      address: data.address
    }
  }
};

function setRegisterErrorModular (error) {
  return {
    type: SET_REGISTER_ERROR,
    payload: error
  }
};

function setRegisterSuccessModular (success) {
  return {
    type: SET_REGISTER_SUCCESS,
    payload: success
  }
};
