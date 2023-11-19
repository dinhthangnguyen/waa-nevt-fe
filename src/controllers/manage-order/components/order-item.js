import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import useAPI from "../../../api";
import { CartCell } from "../../../components";

export const OrderItem = ({ order, reloadFunction }) => {
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