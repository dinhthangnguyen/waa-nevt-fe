import { Button, Card, Col, Container, Row, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import useAPI from "../../api";
import { CartCell } from "../../components";
import "./index.css";

const OrderItem = ({ order, reloadFunction }) => {
    const user = useSelector(state => state.user);
    const { PostClient } = useAPI();

    const shippedOrder = async (e) => {
        if (await ship(e.target.value))
            reloadFunction();
    }

    const ship = async (orderId) => {
        const response = await PostClient("/api/orders/manage/ship", orderId, user.token);
        return response.status === 200;
    }

    const deliveredOrder = async (e) => {
        if (await deliver(e.target.value))
            reloadFunction();
    }

    const deliver = async (orderId) => {
        const response = await PostClient("/api/orders/manage/deliver", orderId, user.token);
        return response.status === 200;
    }

    return (
        <Container className="cartitem">
            <Row >
                <Col lg={12}>
                    <Card.Title>ORDER STATUS:
                        {order.orderStatus === "PLACED" ? (
                            <Button className="disabled" variant="outline-danger">PLACED</Button>
                        ) : (order.orderStatus === "SHIPPED" ?
                            <Button className="disabled" variant="outline-primary">SHIPPED</Button> :
                            <Button className="disabled" variant="outline-success">DELIVERED</Button>)}
                    </Card.Title>
                    <Card.Text>
                        Total: <span className="text-success">${order.total}</span>
                    </Card.Text>
                    <Card.Text>
                        Customer: {order?.address?.name}
                    </Card.Text>
                    <Card.Text>
                        Address: {order?.address?.street} {order?.address?.city}
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
                            value={order.orderId}
                            onClick={shippedOrder}
                            className="mt-auto btn btn-primary non-border-button">
                            SHIPPED
                        </Button>
                    </Col>
                ) : ""}

                {order.orderStatus === "SHIPPED" ? (
                    <Col lg={1}>
                        <Button
                            type="button"
                            value={order.orderId}
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
    const [statusFilter, setStatusFilter] = useState("");
    const { GetClient } = useAPI();

    const loadOrders = async () => {
        const response = await GetClient(`/api/orders/manage?orderStatus=${statusFilter}`, user.token);
        if (response.status === 200) {
            console.log(response.data)
            setOrders(response.data);
        }
    }

    useEffect(() => {
        async function fetching() {
            await loadOrders();
        }
        fetching();
    }, [])

    useEffect(() => {
        const fetching = async () => {
            await loadOrders();
        };
    
        fetching();
    }, [statusFilter]);
    
    const refreshFilter = (e) => {
        setStatusFilter(e.target.value);
    }

    return (
        <Container>
            <Row className=" text-center">
                <div>
                    <h1 id="carName">ORDERS</h1>
                </div>
            </Row>
            <Row>
                <Col lg={8}></Col>
                <Col lg={4}><Form>
                    <Row>
                        <Col lg={4}><Form.Label className="text-right">
                            Search By Status
                        </Form.Label></Col>
                        <Col lg={8}><Form.Select aria-label="Default select example" onChange={refreshFilter}>
                            <option></option>
                            <option value="PLACED">PLACED</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="DELIVERED">DELIVERED</option>
                        </Form.Select></Col>
                    </Row>
                </Form></Col>
            </Row>
            <Row>
                {orders.map(e => (
                    <Col lg={12} key={e.order}>
                        <OrderItem order={e} reloadFunction={loadOrders} />
                    </Col>
                ))}
            </Row>
        </Container>

    )
}

