import "./index.css";

export const CustomFooter = () => {
    return (
        <footer className="text-center text-lg-start bg-light text-muted footer">
            <section className="">
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <i className="fas fa-gem me-3"></i>NEVT
                            </h6>
                            <p>
                                We create a community to connect people who want to provide a car for rent and people who
                                really need them for a couple of days or more.
                            </p>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                PLATFORM
                            </h6>
                            <p>
                                <a href="/about" className="text-reset">About</a>
                            </p>
                            <p>
                                <a href="/rent" className="text-reset">Rent</a>
                            </p>
                            <p>
                                <a href="/owners" className="text-reset">Share Your Car</a>
                            </p>


                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Useful links
                            </h6>

                            <p>
                                <a href="/billings/track-order" className="text-reset">Track Order</a>
                            </p>
                            <p>
                                <a href="/billings/track-email" className="text-reset">Check History</a>
                            </p>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                            <p><i className="fas fa-home me-3"></i> FairField, IW 52557, US</p>
                            <p><i className="fas fa-home me-3"></i> dnguyen@miu.edu</p>
                            <p><i className="fas fa-home me-3"></i> gtran@miu.edu</p>
                            <p><i className="fas fa-phone me-3"></i> + 01 641 233 9637</p>
                            <p><i className="fas fa-print me-3"></i> + 01 641 233 1442</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="text-center p-4" style={{"backgroundColor": 'rgba(0, 0, 0, 0.05)'}}>
                © 2023 Copyright:
                <a className="text-reset fw-bold" href="/">WAA Project CAR ECOMMERCE PLATFORM</a>
            </div>
        </footer>
    )
}