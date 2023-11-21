import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAPI from "../../api";

export const CheckoutCard = () => {
    const order = useSelector(state => state.order);
    const user =  useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialData = { type: "", number: "", validDate: "", validCode: "" };
    const [card, setCard] = useState(initialData);

    const [cardNumberError, setCardNumberError] = useState({});
    const [validDateError, setValidDateError] = useState({});
    const [typeError, setTypeError] = useState({});
    const [cvvError, setCvvError] = useState({});

    useEffect(()=>{
        if (!user) {
            navigate("/login");
            return;
        }
        if (!order.items) {
            navigate("/cart");
        }
        
        if (order.card) {
            setCard(order.card);
        }
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formValidation()) {
            dispatch({type: "createOrder", order: {...order,card: card}});
            navigate("/checkout/confirmation");
        }
    }

    const formValidation = () => {
        let validateE = {isValid: true};
        let cardNumberE = {};
        let dateE = {};
        let typeE = {};
        let cvvE = {};

        let numRegex = new RegExp("^[0-9]{10,12}$")
        if (!numRegex.test(card.number.trim()) ) {
            cardNumberE.cardText = "Card number format incorrect";
            validateE.isValid = false;
        }

        let dateRegex = new RegExp("^[0-9]{2}\/[0-9]{4}$");
        if (!dateRegex.test(card.validDate.trim())) {
            dateE.wrongFormat = "Valid Date format incorrect";
            validateE.isValid = false;
        }

        let cvvRegex = new RegExp("^[0-9]{3}$");
        if (!cvvRegex.test(card.validCode.trim())) {
            cvvE.wrongFormat = "CVV incorrect format";
            validateE.isValid = false;
        }


        if (!(card.type.trim() === "VISA" || card.type.trim() === "MASTERCARD")) {
            typeE.wrongFormat = "Please pick card type";
            validateE.isValid = false;
        }

        setCardNumberError(cardNumberE);
        setTypeError(typeE);
        setCvvError(cvvE);
        setValidDateError(dateE);
        return validateE.isValid;
    }

    const handleFieldChanges = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value })
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h2 id="cardTitle" class="text-center">Please Provide Your Card</h2>
                <Row>
                <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control type="number" name="number" value={card.number} onChange={handleFieldChanges} placeholder="Enter card number" />
                            {Object.keys(cardNumberError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {cardNumberError[key]}
                                </Form.Text>
                            ))}
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

                           {Object.keys(typeError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {typeError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>
                    </Col>

                  
                </Row>

                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Valid Date</Form.Label>
                            <Form.Control type="text" name="validDate" value={card.validDate} onChange={handleFieldChanges} placeholder="MM/YYYY" />
                            {Object.keys(validDateError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {validDateError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>
                    </Col>

                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control type="number" name="validCode" value={card.validCode} onChange={handleFieldChanges} placeholder="CVV" />
                            {Object.keys(cvvError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {cvvError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>

                    </Col>
                </Row>
                <Button id="cardNext" className="btn btn-dark" size="lg" type="submit" variant="dark">Next</Button>
            </Form>


        </Container>
    );
}

