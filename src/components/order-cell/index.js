import { Card, ListGroup } from "react-bootstrap";
import { CartCell } from "../cart-cell";

import "./index.css";

export const OrderCell = ({ order }) => {
    return (
        <Card >
            <Card.Body>
                <Card.Title name="orderStatus">ORDER STATUS: {order.orderStatus}</Card.Title>
                <Card.Text name="orderTotal">
                    Total: <span className="text-success">${order.total}</span>
                </Card.Text>
                {order.items.map(e => (
                    <ListGroup className="order-list-group" key={e.car.productNumber}>
                        <ListGroup.Item>
                            <CartCell item={e} deleteF={null} onNumberChange={null} onReview={true} />
                        </ListGroup.Item>
                    </ListGroup>
                ))}

                <ListGroup className="order-list-group">
                    <ListGroup.Item name="orderCellName">
                        Name: {order.address.name}
                    </ListGroup.Item>
                    <ListGroup.Item name="orderCellPhone">
                        Phone: {order.address.phone}
                    </ListGroup.Item>
                    <ListGroup.Item name="orderCellEmail">
                        Email: {order.address.email}
                    </ListGroup.Item>
                    <ListGroup.Item name="orderCellAddress">
                        Address: {order.address.street} {order.address.city} {order.address.zip}
                    </ListGroup.Item>
                </ListGroup>

                <ListGroup className="order-list-group">

                    <ListGroup.Item name="orderCellCardType">
                        Paid By: {order.card.type}
                    </ListGroup.Item>

                </ListGroup>
            </Card.Body>

        </Card>

    )
}