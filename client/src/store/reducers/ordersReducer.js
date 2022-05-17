import { SET_ORDER, SET_ORDER_LOADING, SET_ORDER_ERROR, SET_ORDER_STATE } from "../actionTypes";

const initialState = {
  orders: [],
  ordersLoading: true,
  ordersError: {},
  MenuId: '',
  quantity: ''
};

export default function ordersReducer (state = initialState, action) {
  switch (action.type) {
    case SET_ORDER:
      return { ...state, orders: action.payload };
    case SET_ORDER_LOADING:
      return { ...state, ordersLoading: action.payload };
    case SET_ORDER_ERROR:
      return { ...state, ordersError: action.payload };
    case SET_ORDER_STATE:
      return { ...state,
      quantity: action.payload.quantity
    }
    default:
      return state;
  }
};