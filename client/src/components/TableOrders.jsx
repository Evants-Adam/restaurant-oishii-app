// ## Component Table Orders/Card ##
export default function TableOrders (props) {
  // Render Component
  return (
    <>
      <div className="section-title text-center mb-4 pb-2">
        <h4 className="title title-line">My Order</h4>
      </div>
      { props.orders.length === 0 ? <div className="section-title text-center mb-4 pb-2">
        <h4>Whooo... no order here, create one please!</h4>
      </div> : ''}
      {props.orders.map((item) => {
        return (
          <div key={item.id} className="col-lg-4 col-md-6 mt-4 pt-2">
            <div className="list-grid-item rounded">
              <div className="grid-item-content p-3">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item f-15">
                    { item.status === 'Open' ? <span className="badge badge-success">{ item.status }</span> : <span className="badge badge-primary">{ item.status }</span> }
                  </li>
                  <li className="list-inline-item float-right">
                    <div className="grid-fev-icon">
                      <a className="text-danger"><i className="mdi mdi-heart"></i></a>
                    </div>
                  </li>
                </ul>
                <div className="grid-list-img mt-3">
                  <img id="food-card-showcase" src={item.Menu.imgUrl} alt={item.Menu.name} className="img-fluid d-block rounded" />
                </div>
                <div className="grid-list-desc mt-3">
                  <p className="text-muted f-14 mb-1">{ item.Menu.name }</p>
                  <p className="text-muted f-14 mb-1">Quantity Ordered: { item.quantity }</p>
                  <p className="text-muted fw-bold mb-1">By: { item.User.email } Ph: { item.User.phoneNumber }</p>
                  <p className="text-muted fw-bold mb-1">{ item.User.address }</p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  );
}