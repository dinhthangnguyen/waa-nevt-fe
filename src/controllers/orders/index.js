import { Col, Container, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import useAPI from "../../api";
import { useNavigate } from "react-router-dom";
import { OrderCell } from "../../components";
import "./index.css";


export const OrderPage = () => {
    const user = useSelector(state => state.user);
    const [orders, setOrders] = useState([]);
    const { GetClient } = useAPI();
    const navigate = useNavigate();

    useEffect(() => {
        const loadOrders = async () => {
            const response = await GetClient(`/api/orders?email=${user.email}`, user.token);
            if (response.status === 200) {
                setOrders(response.data);
                console.log(response.data);
            }
        }

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
                        <OrderCell order={e} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

