import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import useAPI from "../../api";
import { useNavigate } from "react-router-dom";
import { CartCell } from "../../components";
import "./index.css";
import { useEffect } from "react";


export const CheckoutConfirmation = () => {
    const user = useSelector(state => state.user);
    const order = useSelector(state => state.order);
    const { PostClient } = useAPI();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if (!user) {
            navigate("/login");
            return;
        }
        if (!order.items) {
            navigate("/cart");
        }
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await PostClient("/api/orders", order, user.token);
        if (response.status === 200) {
            dispatch({ type: "clearOrder" });
            navigate("/orders");
        }
    }

    return (
        <Container>
            <Row className=" text-center">
                <div>
                    <h1 id="confirmTitle">CHECKOUT CONFIRMATION</h1>
                </div>
            </Row>

            <Row>
                <Col xs={12} >
                    <Button
                        onClick={handleSubmit}
                        id="cButtonFinal"
                        size="lg"
                        type="submit"
                        variant="dark"
                        className="btn btn-primary btn-lg btn-block">
                        Checkout
                    </Button>
                </Col>
            </Row>

            <Row>

                {order.items &&
                    <Col lg={12} >
                        <Card >
                            <Card.Body>
                                <h3 className="text-center">
                                    Items
                                </h3>
                                <Card.Text id="checkoutTotal">
                                    Total: <span className="text-success">${order.total}</span>
                                </Card.Text>
                                {order.items.map(e => (
                                    <ListGroup className="order-list-group" key={e.car.productNumber}>
                                        <ListGroup.Item>
                                            <CartCell item={e} deleteF={null} onNumberChange={null} onReview={false} />
                                        </ListGroup.Item>
                                    </ListGroup>
                                ))}
                                <h3 id="checkoutAddressSubtitle" className="text-center">
                                    Address
                                </h3>
                                <ListGroup className="order-list-group">
                                    <ListGroup.Item id="checkoutAddressName">
                                        Name: {order.address.name}
                                    </ListGroup.Item>
                                    <ListGroup.Item id="checkoutAddressPhone">
                                        Phone: {order.address.phone}
                                    </ListGroup.Item>
                                    <ListGroup.Item id="checkoutAddressEmail">
                                        Email: {order.address.email}
                                    </ListGroup.Item>
                                    <ListGroup.Item id="checkoutAddressFull">
                                        Address: {order.address.street} {order.address.city} {order.address.zip}
                                    </ListGroup.Item>
                                </ListGroup>

                                <h3 id="checkoutCardSubtitle" className="text-center">
                                    Card
                                </h3>
                                <ListGroup className="order-list-group">
                                    <ListGroup.Item id="checkoutNumber">
                                        Number: {order.card.number}
                                    </ListGroup.Item>
                                    <ListGroup.Item id="checkoutCardType">
                                        Type: {order.card.type}
                                    </ListGroup.Item>
                                    <ListGroup.Item id="checkoutValidCode">
                                        CVV: {order.card.validCode}
                                    </ListGroup.Item>
                                    <ListGroup.Item id="checkoutValidDate">
                                        Expired Date: {order.card.validDate}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                }
            </Row>


        </Container>
    )
}

