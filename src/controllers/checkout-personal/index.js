import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const CheckoutPersonalInfo = () => {
    const user = useSelector(state => state.user);
    const order = useSelector(state=> state.order);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialData = {name: user.firstName + " " + user.lastName, email: user.email, phone: "", street: "", city: "", zip: ""}
    const [address, setAddress] = useState(initialData);

    useEffect(()=>{
        setAddress(order.address);
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({type: "addAddress", address: address});
        console.log(address);
        navigate("/checkout/card");
    }

    const handleFieldChanges = (e) => {
        setAddress({...address, [e.target.name]: e.target.value})
    }

    return ( 
        <Container>
            <Form onSubmit={handleSubmit}>
              <h2 class="text-center">Fill in your info</h2>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={address.name} onChange={handleFieldChanges} placeholder="Enter name" />
                        </Form.Group>
                    </Col>

                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={address.email} onChange={handleFieldChanges} placeholder="Enter email" />
                        </Form.Group>

                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="tel" name="phone" value={address.phone} onChange={handleFieldChanges} placeholder="Enter phone" />
                        </Form.Group>
                    </Col>

                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Street</Form.Label>
                            <Form.Control type="text" name="street" value={address.street} onChange={handleFieldChanges} placeholder="Enter street" />
                        </Form.Group>

                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name="city" value={address.city} onChange={handleFieldChanges} placeholder="Enter city" />
                        </Form.Group>
                    </Col>

                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Zip code</Form.Label>
                            <Form.Control type="number" name="zip" value={address.zip} onChange={handleFieldChanges} placeholder="Enter zip" />
                        </Form.Group>
                    </Col>
                </Row>

                <Button className="btn btn-dark" size="lg" type="submit" variant="dark">Add Payment Card</Button>
            </Form>


        </Container>
    );
}

