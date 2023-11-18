import { Button, Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import useAPI from "../../api";
import { useNavigate } from "react-router-dom";
import { CartCell } from "../../components";
import "./index.css";

export const CartPage = () => {
    const carts = useSelector(state => state.carts);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [total, setTotal] = useState(0);
    const { PostClient } = useAPI();
    const navigate = useNavigate();

    const checkout = async (e) => {
        e.preventDefault();
        const order = {items: carts, email: user.email, orderStatus: "PLACED", total: total};
        const response = await PostClient("/api/orders",order,user.token);
        if (response.status === 200) {
            console.log(response.data);
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
                        <CartCell item={e} deleteF={deleteF} onNumberChange={onNumberChange}/>
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

