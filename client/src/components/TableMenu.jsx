// ## Component Table Menu/Table Card ##
export default function TableMenu (props) {
  // ## Function ##
  function handleDetailPageClick (e, id) {
    e.preventDefault();
    props.handleDetailPageClick(id);
  };

  function handleOrderNowClick (e, id) {
    e.preventDefault();
    props.handleOrderNowClick(id);
  }

  // Render Component
  return (
    <>
      {props.menus.map((item) => {
        return (
          <div key={item.id} className="col-lg-4 col-md-6 mt-4 pt-2">
            <div className="list-grid-item rounded">
              <div className="grid-item-content p-3">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item f-15">
                    <span className="badge badge-success">{ item.Category.name }</span>
                  </li>
                </ul>
                <div className="grid-list-img mt-3">
                  <img id="food-card-showcase" src={item.imgUrl} alt={item.name} className="img-fluid d-block rounded" />
                </div>
                <div className="grid-list-desc mt-3">
                  <p className="text-muted f-14 mb-1">{ item.name }</p>
                  <p className="text-muted f-14 mb-1">Price: Rp. { item.price }</p>
                </div>
                <div className="grid-list-desc mt-3">
                  <a href="" className="btn btn-success rounded-pill btn-sm" onClick={(e) => handleOrderNowClick(e, item.id)}> Order Now! </a>
                  <a href="" className="btn btn-warning rounded-pill btn-sm" onClick={(e) => handleDetailPageClick(e, item.id)}> See Detail </a>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  );
}