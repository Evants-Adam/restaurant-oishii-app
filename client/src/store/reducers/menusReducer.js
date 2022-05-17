import { SET_MENUS, SET_MENUS_LOADING, SET_MENUS_ERROR, SET_DETAIL_MENU, SET_DETAIL_MENU_LOADING} from "../actionTypes";

const initialState = {
  menus: [],
  menusLoading: true,
  menusError: {},
  detailMenu: null,
  detailMenuLoading: true,
};

export default function menusReducer (state = initialState, action) {
  switch (action.type) {
    case SET_MENUS:
      return { ...state, menus: action.payload };
    case SET_MENUS_LOADING:
      return { ...state, menusLoading: action.payload };
    case SET_MENUS_ERROR:
      return { ...state, menusError: action.payload };
    case SET_DETAIL_MENU:
      return { ...state, detailMenu: action.payload};
    case SET_DETAIL_MENU_LOADING:
      return { ...state, detailMenuLoading: action.payload};
    default:
      return state;
  }
}
