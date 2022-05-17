// Import Components
import NavbarMenu from "../components/NavbarMenu";

// Import Syntax
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { DetailPart } from "../components/DetailPart"
import { setDetailMenuLoading, setSingleMenu } from "../store/actions/menusAction";
import Loader from "../components/Loader";

// ## Component Detail Page ##
export default function DetailPage () {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { detailMenu, detailMenuLoading } = useSelector(state => state.menusReducer);

  // ## Hook ##
  useEffect(() => {
    dispatch(setSingleMenu(id))
    dispatch(setDetailMenuLoading(true))    
  }, []);
  
  // ## Function ##
  const handleOrder = () => {
    if (!localStorage.getItem('access_token')) {
      history.push('/login')
    } else {
      history.push('/create')
    }
  }
 
  // Render Component
  return (
    <>
      { detailMenuLoading ? <Loader /> :
      <section>
        <NavbarMenu />
        <section className="section pt-0 mt-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="section-title text-center mb-4 pb-2">
                  <h4 className="title title-line">See Menu Details</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <DetailPart detailMenu={detailMenu} handleOrder={handleOrder} />
            </div>
          </div>
        </section>
      </section>}
    </>
  )
}