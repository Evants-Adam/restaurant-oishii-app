// Import Components
import NavbarMenu from '../components/NavbarMenu';
import TableMenu from '../components/TableMenu';

// Import Syntax
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setMenus, setMenusLoading } from '../store/actions/menusAction';
import Loader from '../components/Loader';

// ## Component Home Page ##
export default function HomePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { menus, menusLoading, menusError } = useSelector(state => state.menusReducer);

  // ## Hook ##
  useEffect(() => {
    dispatch(setMenus());
    dispatch(setMenusLoading(true))
  }, []);

  // ## Function ##
  const handleDetailPageClick = (id) => {
    history.push(`/detail/${id}`);
  };

  const handleOrderNowClick = (id) => {
    history.push(`/create?menu=${id}`)
  };

  // Render Page
  return (
    <>
      { menusLoading ? <Loader /> :
      <section>
        <NavbarMenu />
        <section className="bg-half page-next-level">
        <div className="bg-overlay"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="home-form-position">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <div className="text-center text-white">
                        <h4 className="text-uppercase title mb-4">Welcome to "Oishii Restaurant"</h4>
                        <p>Glad to see you back again!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="home-form-position">
              <div className="col-lg-12">
                <div className="row">
                { menusError && <h1>{ menusError.message }</h1>}
                <TableMenu menus={menus} handleDetailPageClick={handleDetailPageClick} handleOrderNowClick={handleOrderNowClick}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> }
    </>
  );
}