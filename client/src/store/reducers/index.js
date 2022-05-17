
import menusReducer from "./menusReducer";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import ordersReducer from "./ordersReducer";
import userReducer from "./userReducer";
import { combineReducers } from 'redux';

export default combineReducers({
  menusReducer,
  loginReducer,
  registerReducer,
  ordersReducer,
  userReducer
})