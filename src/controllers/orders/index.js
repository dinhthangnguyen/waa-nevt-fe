import { Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import useAPI from "../../api";
import { OrderCell } from "../../components";
import "./index.css";
import { useNavigate } from "react-router-dom";


export const OrderPage = () => {
    const user = useSelector(state => state.user);
    const [orders, setOrders] = useState([]);
    const { GetClient } = useAPI();
    const dispatch = useDispatch();
    const navitate = useNavigate();
    useEffect(() => {
        const loadOrders = async () => {
            try {
                const response = await GetClient(`/api/orders?email=${user.email}`, user.token);
                if (response.status === 200) {
                    setOrders(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                dispatch({type: "logout"});
                navitate("/login ")
            }

        }

       loadOrders();
    }, [user]);

    return (
        <Container>
            <Row className=" text-center">
                <div>
                    <h1 id="orderTitle">ORDERS</h1>
                </div>
            </Row>
            <Row >
                {orders.map(e => (
                    <Col lg={12} className="order-cell" key={e.orderId}>
                       <div className="order-row">
                       <OrderCell order={e} />
                       </div>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

