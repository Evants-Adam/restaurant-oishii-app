import { SET_REGISTER, SET_REGISTER_ERROR, SET_REGISTER_SUCCESS } from "../actionTypes";

const initialState = {
  email: '',
  password: '',
  phoneNumber: '',
  address: '',
  registerSuccess: false,
  registerError: {}
}

export default function registerReducer (state = initialState, action) {
  switch (action.type) {
    case SET_REGISTER:
      return { ...state, 
        email: action.payload.email, 
        password: action.payload.password,
        phoneNumber: action.payload.phoneNumber,
        address: action.payload.address
      };
    case SET_REGISTER_ERROR:
      return { ...state, registerError: action.payload}
    case SET_REGISTER_SUCCESS:
      return { ...state, registerSuccess: action.payload}
    default:
      return state
  }
}