import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import useAPI from "../../api";
import { useNavigate } from "react-router-dom";
import { CartCell } from "../../components";
import "./index.css";


export const CheckoutConfirmation = () => {
    const user = useSelector(state => state.user);
    const order = useSelector(state => state.order);
    const { PostClient } = useAPI();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(order);
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
                    <h1 id="carName">Checkout Confirmation</h1>
                </div>
            </Row>
            {order.items &&
                <Row>
                    <Col lg={12} >
                        <Card >
                            <Card.Body>
                                <h3 className="text-center">
                                    Items
                                </h3>
                                <Card.Text>
                                    Total: <span className="text-success">${order.total}</span>
                                </Card.Text>
                                {order.items.map(e => (
                                    <ListGroup className="order-list-group" key={e.car.productNumber}>
                                        <ListGroup.Item>
                                            <CartCell item={e} deleteF={null} onNumberChange={null} onReview={false} />
                                        </ListGroup.Item>
                                    </ListGroup>
                                ))}
                                <h3 className="text-center">
                                    Address
                                </h3>
                                <ListGroup className="order-list-group">
                                    <ListGroup.Item>
                                        Name: {order.address.name}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Phone: {order.address.phone}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Email: {order.address.email}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Address: {order.address.street} {order.address.city} {order.address.zip}
                                    </ListGroup.Item>
                                </ListGroup>

                                <h3 className="text-center">
                                    Card
                                </h3>
                                <ListGroup className="order-list-group">
                                    <ListGroup.Item>
                                        Number: {order.card.number}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Type: {order.card.type}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        CVV: {order.card.validCode}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Expired Date: {order.card.validDate}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            }

            <Row>
                <Col>
                    <Button className="btn btn-dark"
                        size="lg"
                        onClick={handleSubmit}
                        type="submit" variant="dark">Checkout</Button>
                </Col>
            </Row>
        </Container>
    )
}

