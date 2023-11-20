import { Card, ListGroup } from "react-bootstrap";
import { CartCell } from "../cart-cell";

import "./index.css";

export const OrderCell = ({ order }) => {
    return (
        <Card >
            <Card.Body>
                <Card.Title>ORDER STATUS: {order.orderStatus}</Card.Title>
                <Card.Text>
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

                <ListGroup className="order-list-group">

                    <ListGroup.Item>
                        Paid By: {order.card.type}
                    </ListGroup.Item>

                </ListGroup>
            </Card.Body>

        </Card>

    )
}