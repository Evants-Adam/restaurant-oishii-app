import { SET_LOGIN, SET_LOGIN_ERROR, SET_LOGIN_SUCCESS } from "../actionTypes";

const initialState = {
  email: '',
  password: '',
  loginError: {},
  loginSuccess: false
}

export default function loginReducer (state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN:
      return { ...state, email: action.payload.email, password: action.payload.password}
    case SET_LOGIN_ERROR:
      return { ...state, loginError: action.payload }
    case SET_LOGIN_SUCCESS:
      return { ...state, loginSuccess: action.payload }
    default:
      return state
  }
}