import { SET_USER, SET_USER_ERROR, SET_USER_LOADING } from "../actionTypes";

const initialState = {
  id: '',
  email: '',
  getUserLoading: true,
  getUserError: {}
}

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, id: action.payload.id, email: action.payload.email}
    case SET_USER_ERROR:
      return { ...state, getUserError: action.payload }
    case SET_USER_LOADING:
      return { ...state, getUserLoading: action.payload }
    default:
      return state
  }
}