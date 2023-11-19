import { Col, Container, Row, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import useAPI from "../../api";
import { OrderItem } from "./components/order-item";
import "./index.css";

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

