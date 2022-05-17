import { TailSpin } from  'react-loader-spinner'
export default function Loader () {
  return (
    <>
      <section className="vh-100">
        <div className="home-center">
          <div className="home-desc-center">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-12 col-md-6 align-item-center">
                  <div className="d-flex justify-content-center">
                  <TailSpin color="#00BFFF" height={80} width={80} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
};