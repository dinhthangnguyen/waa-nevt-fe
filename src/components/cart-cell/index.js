import { Container, Row, Col, Card, Form, Image, Button } from "react-bootstrap";
import "./index.css";
import { host } from "../../api";
import { useNavigate } from "react-router-dom";

export const CartCell = ({ item, deleteF, onNumberChange, onReview = null }) => {
    const navigate = useNavigate();

    let options = [];
    item.car.attributeTypes.forEach(type => {
        type.items.filter(o => o.selected === true).forEach(i => {
            options.push(i);
        })
    });

    const numberChange = (e) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        const unitPrice = item.totalPrice / item.number;

        if (value) {
            let temp = { ...item, number: value, totalPrice: unitPrice * value }
            onNumberChange(item, temp);
        }
    }

    const handleDelete = (e) => {
        e.preventDefault();
        deleteF(item);
    }

    const handleReview = (e) => {
        e.preventDefault();
        navigate("/cars/"+ e.target.value);
    }

    return (
        <Container className="cartitem">
            <Row >
                <Col lg={3}>
                    <Image rounded className="w-100" src={host + "/api/images/" + item.car.images[0]} />
                </Col>
                <Col lg={6}>
                    <div>
                        <Card.Title>{item.car.name.toUpperCase()}</Card.Title>
                        <Card.Text>
                            Total Price: <span className="text-success">${item.totalPrice}</span>
                        </Card.Text>

                        <Card.Text>
                            Make: {item.car.make}
                        </Card.Text>
                        <Card.Text>
                            Model: {item.car.model}
                        </Card.Text>
                    </div>

                    <div className="text-center d-flex">
                        {options.map(e => {
                            return <div className="cart-cell" key={e.value} >
                                <p className=" text-uppercase">
                                    {e.value}
                                </p>
                                <p className={e.selected ? "" : " text-success"}>${e.additionalPrice}</p>
                            </div>
                        })}
                    </div>



                </Col>
                <Col lg={3}>
                    <div className="mb-6 mb-lg-0 text-center cart-select"  >
                        <Form.Select onChange={numberChange} disabled={!onNumberChange} value={item.number} aria-label="Default select example">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </Form.Select>
                    </div>
                    <div className="button-box">
                        {deleteF &&
                            <Button value={item.car.productNumber} rounded variant="danger" onClick={handleDelete} >Delete</Button>
                        }

                        {onReview &&
                            <Button value={item.car.productNumber} rounded variant="light" onClick={handleReview} >Review</Button>
                        }
                    </div>
                </Col>
            </Row>

        </Container>

    )
}