import { useNavigate } from "react-router-dom";
import "./index.css";
import { Nav } from "react-bootstrap";

export const CustomFooter = () => {
    const navigate = useNavigate();

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
                                We are a fictional startup who excels in New Energy Vehicle. We have stock of the most advanced electrified vehicle models in the world at the lowest price possible
                            </p>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                PLATFORM
                            </h6>
                            <p>
                                <Nav.Link onClick={() => navigate("/about")} className="text-reset">About</Nav.Link>
                            </p>
                            <p>
                                <Nav.Link onClick={() => navigate("/cars")} className="text-reset">Search Cars</Nav.Link>

                            </p>

                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Useful links
                            </h6>
                            <p>
                                <Nav.Link onClick={() => navigate("/orders")} className="text-reset">Track Orders</Nav.Link>
                            </p>
                            <p>
                                <Nav.Link onClick={() => navigate("/cart")} className="text-reset">Check Cart</Nav.Link>
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

            <div className="text-center p-4" style={{ "backgroundColor": 'rgba(0, 0, 0, 0.05)' }}>
                © 2023 Copyright:
                <a className="text-reset fw-bold" href="/">WAA Project CAR ECOMMERCE PLATFORM</a>
            </div>
        </footer>
    )
}