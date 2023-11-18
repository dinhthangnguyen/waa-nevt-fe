import { Button, Col, Container, Form, Image, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import Card from 'react-bootstrap/Card';
import "./index.css";

const CartCell2 = ({ item }) => {
    console.log(item);
    let options = [];
    item.car.attributeTypes.forEach(type => {
        type.items.filter(o => o.selected === true).forEach(i => {
            options.push(i);
        })
    });

    const numberChange = (e) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        if (value) {
            // setSelect(true);
            // setNumber(value);
            // calculateTotalPrice(car,value);
        } else {
            // setSelect(false);
        }
    }

    return (
        <Container className="cartitem">
            <Row >
                <Col lg={3}>
                    <Image rounded className="w-100" src={item.car.images[0]} />
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
                        <Form.Select onChange={numberChange} value={item.number} aria-label="Default select example">
                            <option>Select number</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </Form.Select>
                    </div>
                    <div className="button-box">
                        <Button value={item.car.productNumber} rounded variant="danger" >Delete</Button>

                    </div>
                </Col>
            </Row>

        </Container>

    )
}


export const Cart = () => {
    const carts = useSelector(state => state.carts)
    return (
        <Container>
            <Row>
                {carts.map(e => (
                    <Col lg={12} key={e.car.productNumber}>
                        <CartCell2 item={e} />
                    </Col>
                ))}
            </Row>

        </Container>

    )
}

