import { Button, Col, Container, Form, Image, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Card from 'react-bootstrap/Card';
import "./index.css";
import { useEffect, useState } from "react";
import useAPI from "../../api";
import { useNavigate } from "react-router-dom";

const CartCell2 = ({ item, deleteF, onNumberChange }) => {
    let options = [];
    item.car.attributeTypes.forEach(type => {
        type.items.filter(o => o.selected === true).forEach(i => {
            options.push(i);
        })
    });

    const numberChange = (e) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        const unitPrice = item.totalPrice /item.number;

        if (value) {
            let temp = {...item, number: value, totalPrice: unitPrice * value}
            onNumberChange(item, temp);
        } 
    }

    const handleDelete = (e) => {
        e.preventDefault();
        deleteF(item);
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
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </Form.Select>
                    </div>
                    <div className="button-box">
                        <Button value={item.car.productNumber} rounded variant="danger" onClick={handleDelete} >Delete</Button>

                    </div>
                </Col>
            </Row>

        </Container>

    )
}


export const Cart = () => {
    const carts = useSelector(state => state.carts);
    const dispatch = useDispatch();

    const [total, setTotal] = useState(0);
    const { PostClient } = useAPI();
    const navigate = useNavigate();

    const checkout = async (e) => {
        e.preventDefault();
        const response = await PostClient("/api/orders",carts);
        if (response.status === 200) {
            console.log("status 200");
            navigate("/orders");
        }
    }

    const onNumberChange = (oldItem, newItem) => {
        dispatch({type: "updateCart", item: oldItem, newItem: newItem});
    }

    useEffect(() => {
        let temp = carts.map(e => e.totalPrice).reduce((a, b) => a + b, 0);
        setTotal(temp);
    }, [carts])

    const deleteF = (item) => {
        console.log(item);
        dispatch({type: "deleteCartItem", item: item})
    }

    return (
        <Container>
            <Row className=" text-center">
                <div>
                    <h1 id="carName">SHOPPING CART</h1>
                </div>
            </Row>
            <Row>
                {carts.map(e => (
                    <Col lg={12} key={e.car.productNumber}>
                        <CartCell2 item={e} deleteF={deleteF} onNumberChange={onNumberChange}/>
                    </Col>
                ))}
            </Row>

            <Row>
                <Col xs={12} className="mb-6 mb-lg-0 text-center total" >
                    <h4 id="total" className="card-title">Total Price: <span className="text-success">${total}</span> </h4>
                </Col>

                <Col lg={3} />
                <Col lg={6} className=" gap-2 text-center addcart">
                    <Button className="btn btn-dark" onClick={checkout} size="lg" variant="dark">Checkout</Button>
                </Col>
                <Col lg={3} />

            </Row>


        </Container>

    )
}

