// Import Components
import NavbarMenu from '../components/NavbarMenu';
import TableOrders from '../components/TableOrders';

// Import Syntax
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setOrders, setOrdersLoading } from '../store/actions/ordersAction';
import { setUser } from '../store/actions/userAction';
import Loader from '../components/Loader';

// ## Component Admin Home Page ##
export default function OrderPage() {
  const dispatch = useDispatch();
  const { orders, ordersLoading, ordersError } = useSelector(state => state.ordersReducer);

  // ## Hook ##
  useEffect(() => {
    dispatch(setUser())
    .then((state) => {
      if (state) {
        dispatch(setOrders());
      }
    })
    dispatch(setOrdersLoading(true))
  }, []);

  // Render Page
  return (
    <>
      { ordersLoading ? <Loader /> : 
      <section>
        <NavbarMenu />
        <div className="container bg-top">
          <div className="row justify-content-center">
            <div className="home-form-position">
              <div className="col-lg-12">
                <div className="row">
                { ordersError && <h1>{ ordersError.message }</h1>}
                <TableOrders orders={orders}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>}
    </>
  );
}