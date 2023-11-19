import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import useAPI from "../../api";
import { useNavigate } from "react-router-dom";
import { CartCell } from "../../components";
import "./index.css";

const OrderItem = ({ order, reloadFunction }) => {
    
    const { PostClient } = useAPI();

    const shipedOrder = async (e) => {
        if(await ship(e.target.value))
            reloadFunction();
    }

    const ship = async (orderId) => {
        const response = await PostClient("/api/orders/ship", orderId);
        return response.state === 200;
    }

    const deliveredOrder = async (e) => {
        if(await deliver(e.target.value))
            reloadFunction();
    }

    const deliver = async (orderId) => {
        const response = await PostClient("/api/orders/deliver", orderId);
        return response.state === 200;
    }

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
            <Row>
                {order.orderStatus === "PLACED" ? (
                    <Col lg={1}>
                        <Button
                            type="button"
                            value = {order.orderId}
                            onClick={shipedOrder}
                            className="mt-auto btn btn-primary non-border-button">
                            SHIPPED
                        </Button>
                    </Col>
                ) : ""}

                {order.orderStatus === "SHIPPED" ? (
                    <Col lg={1}>
                        <Button
                            type="button"
                            value = {order.orderId}
                            onClick={deliveredOrder}
                            className="mt-auto btn btn-success non-border-button">
                            DELIVERED
                        </Button>
                    </Col>
                ) : ""}
            </Row>

        </Container>

    )
}
export const ManageOrderPage = () => {
    const user = useSelector(state => state.user);
    const [orders, setOrders] = useState([]);
    const { GetClient } = useAPI();
    const navigate = useNavigate();

    const loadOrders = async () => {
        const response = await GetClient(`/api/orders/manage`, user.token);
        console.log(response);
        if (response.status === 200) {
            setOrders(response.data);
            console.log(response.data);
        }
    }

    useEffect(() => {
        async function fetching() {
            await loadOrders();
        }
        fetching();
    }, [user])

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
                        <OrderItem order={e} reloadFunction = {loadOrders}/>
                    </Col>
                ))}
            </Row>
        </Container>

    )
}

