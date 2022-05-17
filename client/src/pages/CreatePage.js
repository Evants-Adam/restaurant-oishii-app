// Import Components
import MenuForm from '../components/MenuForm';

// Import Syntax
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { setDetailMenuLoading, setSingleMenu } from '../store/actions/menusAction.js';
import { postOrder } from '../store/actions/ordersAction';
import Loader from '../components/Loader';

// ## Component Create Page ##
export default function CreatePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const useQuery = () => {
    const { search } = useLocation()
    return React.useMemo(() => new URLSearchParams(search), [search])
  };
  let query = useQuery();
  let MenuId = query.get('menu');
  
  // ## Hook ##
  useEffect(() => {
    dispatch(setSingleMenu(MenuId))
    dispatch(setDetailMenuLoading(true))    
  }, []);

  // ## Function ##
  const postSubmitNewOrder = (id) => {
    dispatch(postOrder(id))
    .then((state) => {
      if (state) {
        history.push('/home')
      }
    })
  };

  const { detailMenu, detailMenuLoading } = useSelector(state => state.menusReducer);

  const handleCancelClick = () => {
    history.push('/home')
  };

  // Render Component
  return (
    <>
      { detailMenuLoading ? <Loader /> :
      <section id="bg-login" className="vh-100">
        <div className="home-center">
          <div className="home-desc-center">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8 col-md-6">
                  <div className="login-page bg-white shadow rounded p-4">
                    <MenuForm menu={detailMenu} onAddOrder={postSubmitNewOrder} handleCancelClick={handleCancelClick}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> }
    </>
  );
}