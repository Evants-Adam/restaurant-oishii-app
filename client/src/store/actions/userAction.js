import { SET_USER, SET_USER_ERROR, SET_USER_LOADING } from "../actionTypes";

export function setUser() {
  return async (dispatch) => {
    const requestOptions = {
      headers: { 'access_token': localStorage.getItem('access_token') }
    };

    return fetch('https://restaurant-oishii-app.herokuapp.com/public/user', requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw Error('Could not fetch the data for that resources')
        }
        return response.json()
      })
      .then((data) => {
        dispatch(setUserModular(data))
        return true
      })
      .catch((error) => dispatch(setUserErrorModular(error)))
      .finally((_) => dispatch(setUserLoadingModular(false)))
  }
};

// Helper Modular Function
function setUserModular (data) {
  return {
    type: SET_USER,
    payload: {
      id: data.id,
      email: data.email
    }
  }
};

function setUserErrorModular (error) {
  return {
    type: SET_USER_ERROR,
    payload: error
  }
};

function setUserLoadingModular (loading) {
  return {
    type: SET_USER_LOADING,
    payload: loading
  }
};