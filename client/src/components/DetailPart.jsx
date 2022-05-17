// ## Component Detail Part ##
export function DetailPart (props) {
  // ## Function ##
  function orderNowClick (e, id) {
    e.preventDefault();
    props.handleOrder(id);
  }
  // Render Component
  return (
    <>
    <div className="col-lg-12 col-md-6 pt-2">
      <div className="job-detail border rounded p-4">
        <div className="job-detail-content">
          <div className="row align-items-center">
            <div className="col-lg-2">
              <div className="company-logo-img">
                <img 
                  src={ props.detailMenu.imgUrl } 
                  alt={ props.detailMenu.name } 
                  className="img-fluid float-left mr-md-3 my-3 mr-2 mx-auto d-inline-block rounded" />
              </div>
            </div>
            <div className="col-lg-7 col-md-9">
              <div className="job-list-desc"></div>
                <h6 className="mb-2"><a href="#" className="text-dark">{}</a></h6>
                  <p className="text-muted mb-0"><i className="mdi mdi-bank mr-2"></i>{}</p>
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item f-15">
                      <span className="badge badge-info">
                      { props.detailMenu.Category.name }</span>
                    </li>
                  </ul>
                  <h4 className="mb-2"><a className="text-dark">{ props.detailMenu.name }</a></h4>
                  <p className="text-muted mb-0">Description: { props.detailMenu.description }</p>
                  <p className="text-muted mb-0">Price: Rp. { props.detailMenu.price }</p>
                  <br/>
                  <a href="" className="btn btn-danger rounded-pill btn-sm" onClick={(e) => orderNowClick(e, props.detailMenu.id)}> Order </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}