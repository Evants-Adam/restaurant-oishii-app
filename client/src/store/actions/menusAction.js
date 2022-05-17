import { SET_MENUS, SET_MENUS_LOADING, SET_MENUS_ERROR, SET_DETAIL_MENU, SET_DETAIL_MENU_LOADING} from "../actionTypes";

// # Actions
export function setDetailMenuLoading(data) {
  return (dispatch) => dispatch(setDetailMenuLoadingModular(data))
}

export function setMenusLoading(data) {
  return (dispatch) => dispatch(setMenusLoadingModular(data))
}

export function setMenus() {
  return (dispatch) => {
    fetch('https://restaurant-oishii-app.herokuapp.com/public/menu')
      .then((response) => {
        if (!response.ok) {
          throw Error('Could not fetch the data for that resources')
        }
        return response.json()
      })
      .then((data) => {
        const activeMenu = data.filter((item) => item.stock !== 0)
        dispatch(setMenusModular(activeMenu))
      })
      .catch((error) => dispatch(setMenusErrorModular(error)))
      .finally((_) => dispatch(setMenusLoadingModular(false)))
  }
};

export function setSingleMenu(id) {
  return (dispatch) => {
    fetch(`https://restaurant-oishii-app.herokuapp.com/public/menu/${id}`, )
      .then((response) => {
        if (!response.ok) {
          throw Error('Could not fetch the data for that resources')
        }
        return response.json()
      })
      .then((data) => dispatch(setDetailMenuModular(data)))
      .catch((error) => dispatch(setMenusErrorModular(error)))
      .finally((_) => dispatch(setDetailMenuLoadingModular(false)))
  }
};

// Modular Function
function setMenusModular (data) {
  return {
    type: SET_MENUS,
    payload: data
  }
};

function setMenusErrorModular (error) {
  return {
    type: SET_MENUS_ERROR,
    payload: error
  }
};

function setMenusLoadingModular (loading) {
  return {
    type: SET_MENUS_LOADING,
    payload: loading
  }
};

function setDetailMenuModular(data) {
  return {
    type: SET_DETAIL_MENU,
    payload: data
  }
}

function setDetailMenuLoadingModular(data) {
  return {
    type: SET_DETAIL_MENU_LOADING,
    payload: data
  }
};