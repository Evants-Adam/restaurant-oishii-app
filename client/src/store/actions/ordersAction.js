import { SET_ORDER, SET_ORDER_LOADING, SET_ORDER_ERROR, SET_ORDER_STATE } from "../actionTypes";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// # Actions
export function setOrdersState(data) {
  return (dispatch) => dispatch(setOrdersStateModular(data))
};

export function setOrdersLoading(data) {
  return (dispatch) => dispatch(setOrdersLoadingModular(data))
};

export function postOrder(id) {
  return async (dispatch, getState) => {
    const { quantity } = getState().ordersReducer;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'access_token': localStorage.getItem('access_token') },
      body: JSON.stringify({ quantity })
    };

    return fetch(`https://restaurant-oishii-app.herokuapp.com/public/order/${id}`, requestOptions)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.id) {
          // # Sweetalert fires
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            title: <strong>Nice!</strong>,
            html: <p>New Order successfully created!</p>,
            icon: 'success'
          });

          return true;
        } else {
          // # Sweetalert fires
          const MySwal = withReactContent(Swal);
          MySwal.fire({
            title: <strong>Ops..</strong>,
            html: <p>Sorry! Our stock for this item is less than what you have inputed. Please try again with lesser number.</p>,
            icon: 'error'
          });

          return false;
        }
      })
      .catch((error) => dispatch(setOrdersErrorModular(error)))
      .finally((_) => dispatch(setOrdersLoadingModular(false)))
  }
}

export function setOrders() {
  return (dispatch, getState) => {
    const { id } = getState().userReducer;
    const requestOptions = {
      headers: { 'access_token': localStorage.getItem('access_token') }
    };

    fetch(`https://restaurant-oishii-app.herokuapp.com/public/order/${id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw Error('Could not fetch the data for that resources')
        }
        return response.json()
      })
      .then((data) => dispatch(setOrdersModular(data)))
      .catch((error) => dispatch(setOrdersErrorModular(error)))
      .finally((_) => dispatch(setOrdersLoadingModular(false)))
  }
};


// Modular Function
function setOrdersModular (data) {
  return {
    type: SET_ORDER,
    payload: data
  }
};

function setOrdersErrorModular (error) {
  return {
    type: SET_ORDER_ERROR,
    payload: error
  }
};

function setOrdersLoadingModular (loading) {
  return {
    type: SET_ORDER_LOADING,
    payload: loading
  }
};

function setOrdersStateModular (data) {
  return {
    type: SET_ORDER_STATE,
    payload: {
      quantity: data.quantity
    }
  }
};