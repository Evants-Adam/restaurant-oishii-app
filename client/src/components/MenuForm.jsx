// Import Syntax
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { setOrdersState } from "../store/actions/ordersAction";

// ## Component Menu Form ##
export default function MenuForm (props) {
  const dispatch = useDispatch();
  const ordersState = useSelector(state => state.ordersReducer);
  const useQuery = () => {
    const { search } = useLocation()
    return React.useMemo(() => new URLSearchParams(search), [search])
  };
  let query = useQuery();
  let MenuId = query.get('menu');
  
  // ## Function ##
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch(setOrdersState({ ...ordersState, [name]: value }));
  };
  const handleOnSubmitCreate = (e) => {
    e.preventDefault();
    props.onAddOrder(MenuId);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    props.handleCancelClick();
  }

  // Render Component
  return (
    <>
      <div className="wrapper mt-5 mx-auto" style={{width: 35 + 'vw'}}>
        <div className="section-title text-center mb-4 pb-2">
          <h4 className="title title-line">{"Create New Order"}</h4>
        </div>
        <form className="login-form" onSubmit={e => handleOnSubmitCreate(e)}>
          <div className="row">
            <div className="col-lg-12">
              <div className="company-logo-img">
                <img 
                  src={ props.menu.imgUrl } 
                  alt={ props.menu.name } 
                  className="img-fluid float-left mr-md-3 my-3 mr-2 mx-auto d-inline-block rounded" />
              </div>
              <div className="mb-3 form-group position-relative">
                <label className="form-label">Order Quantity <span className="text-danger">*</span></label>
                <input name="quantity" type="text" className="form-control"
                placeholder="Insert your order"
                onChange={e => handleOnChange(e)}/>
              </div>
              <div className="mb-3 form-group position-relative">
                <label className="form-label">Please make sure your order is right, You may not cancel your order once submitted <span className="text-danger">*</span></label>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-warning w-100">Submit</button>
                <button className="btn btn-danger mx-1" id="create-a-job-vacancy-cancel" onClick={(e) => handleCancelClick(e)}>
                Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}