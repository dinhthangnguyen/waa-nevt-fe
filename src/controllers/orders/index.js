import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import useAPI from "../../api";
import { useNavigate } from "react-router-dom";
import { CartCell } from "../../components";
import "./index.css";

const OrderItem = ({ order }) => {
    return (
        <Container className="cartitem">
            <Row >
                <Col lg={12}>
                    <Card.Title>ORDER STATUS: {order.orderStatus}</Card.Title>
                    <Card.Text>
                        Total: <span className="text-success">${order.total}</span>
                    </Card.Text>
                </Col>
                {order.items.map(e => (
                    <Col lg={12} key={e.car.productNumber}>
                        <CartCell item={e} deleteF={null} onNumberChange={null} />
                    </Col>
                ))}
            </Row>

        </Container>

    )
}
export const OrderPage = () => {
    const user = useSelector(state => state.user);
    const [orders, setOrders] = useState([]);
    const { GetClient } = useAPI();
    const navigate = useNavigate();

    useEffect(() => {
        const loadOrders = async () => {
            const response = await GetClient(`/api/orders?email=${user.email}`, user.token);
            if (response.status === 200) {
                setOrders(response.data);
                console.log(response.data);
            }
        }

        async function fetching() {
            await loadOrders();
        }
        fetching();
    }, [GetClient, user])

    const toReview = (e) => {
        navigate("/cars/" + e.target.value);
    }

    return (
        <Container>
            <Row className=" text-center">
                <div>
                    <h1 id="carName">ORDERS</h1>
                </div>
            </Row>
            <Row>
                {orders.map(e => (
                    <Col lg={12} key={e.order}>
                        <OrderItem order={e} />
                    </Col>
                ))}
            </Row>

            {/* <Row>
                <Col xs={12} className="mb-6 mb-lg-0 text-center total" >
                    <h4 id="total" className="card-title">Total Price: <span className="text-success">${total}</span> </h4>
                </Col>

                <Col lg={3} />
                <Col lg={6} className=" gap-2 text-center addcart">
                    <Button className="btn btn-dark" onClick={checkout} size="lg" variant="dark">Checkout</Button>
                </Col>
                <Col lg={3} />

            </Row> */}


        </Container>

    )
}

