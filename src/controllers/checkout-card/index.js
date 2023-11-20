import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAPI from "../../api";

export const CheckoutCard = () => {
    const order = useSelector(state => state.order);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialData = { type: "", number: "", validDate: "", validCode: "" };
    const { PostClient } = useAPI();
    const [card, setCard] = useState(initialData);

    useEffect(()=>{
        if (order.card) {
            setCard(order.card);
        }
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch({type: "addCard", card});
        navigate("/checkout/confirmation");
    }

    const handleFieldChanges = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value })
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h2 class="text-center">Please Provide Your Card</h2>
                <Row>
                <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control type="number" name="number" value={card.number} onChange={handleFieldChanges} placeholder="Enter card number" />
                        </Form.Group>

                    </Col>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <Form.Label>Type</Form.Label>
                            <div >
                           <Form.Check // prettier-ignore
                                type="radio"
                                value="VISA"
                                name="type"
                                id="VISA"
                                inline
                                onChange={handleFieldChanges}
                                checked={card.type === "VISA"}
                                label="VISA"
                            />

                            <Form.Check // prettier-ignore
                                type="radio"
                                value="MASTERCARD"
                                name="type"
                                inline
                                id="MASTERCARD"
                                onChange={handleFieldChanges}
                                checked={card.type === "MASTERCARD"}
                                label="MASTERCARD"
                            />
                           </div>

                        </Form.Group>
                    </Col>

                  
                </Row>

                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Valid Date</Form.Label>
                            <Form.Control type="text" name="validDate" value={card.validDate} onChange={handleFieldChanges} placeholder="MM/YYYY" />
                        </Form.Group>
                    </Col>

                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control type="number" name="validCode" value={card.validCode} onChange={handleFieldChanges} placeholder="CVV" />
                        </Form.Group>

                    </Col>
                </Row>
                <Button className="btn btn-dark" size="lg" type="submit" variant="dark">Next</Button>
            </Form>


        </Container>
    );
}

