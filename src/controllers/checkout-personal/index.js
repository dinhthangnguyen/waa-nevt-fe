import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const CheckoutPersonalInfo = () => {
    const user = useSelector(state => state.user);
    const order = useSelector(state => state.order);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialData = { name: user.firstName + " " + user.lastName, email: user.email, phone: "", street: "", city: "", zip: "" }
    const [address, setAddress] = useState(initialData);

    const [nameError, setNameError] = useState({});
    const [emailError, setEmailError] = useState({});
    const [phoneError, setPhoneError] = useState({});
    const [cityError, setCityError] = useState({});
    const [streetError, setStreetError] = useState({});
    const [zipError, setZipError] = useState({});

    useEffect(() => {
        if (order.address.name) {
            setAddress(order.address);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValidation()) {
            dispatch({ type: "createOrder", order: { ...order, address: address } });
            navigate("/checkout/card");
        }
    }

    const formValidation = () => {
        let validateE = {isValid: true};
        let nameE = {};
        let emailE = {};
        let phoneE = {};
        let cityE = {};
        let streetE = {};
        let zipE = {};

        if (address.name.trim().length < 2) {
            nameE.nameShort = "Name is too short";
            validateE.isValid = false;
        }

        let eRegex = new RegExp("^[a-zA-Z]+\@[a-zA-Z]+\.[a-zA-Z]{2,}$");
        if (!eRegex.test(address.email.trim())) {
            emailE.wrongFormat = "Email format incorrect";
            validateE.isValid = false;
        }


        let phoneRegex = new RegExp("^[0-9+.]{5,}$");
        if (!phoneRegex.test(address.phone.trim())) {
            phoneE.phoneFormat = "phone format incorrect";
            validateE.isValid = false;
        }

        if (address.city.trim().length < 2) {
            cityE.cityShort = "City name is too short";
            validateE.isValid = false;
        }

        if (address.street.trim().length < 2) {
            streetE.streetShort = "Street name is too short";
            validateE.isValid = false;
        }

        let zipRegex = new RegExp("^[0-9]{5}$");
        if (!zipRegex.test(address.zip.trim())) {
            zipE.phoneFormat = "zip format incorrect";
            validateE.isValid = false;
        }
        setNameError(nameE);
        setEmailError(emailE);
        setPhoneError(phoneE);
        setCityError(cityE);
        setStreetError(streetE);
        setZipError(zipE);
        return validateE.isValid;
    }

    const handleFieldChanges = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value })
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h2 id="addressTitle" className="text-center">Fill in your info</h2>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={address.name} onChange={handleFieldChanges} placeholder="Enter name" />
                            {Object.keys(nameError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {nameError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>


                    </Col>

                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={address.email} onChange={handleFieldChanges} placeholder="Enter email" />
                            {Object.keys(emailError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {emailError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="tel" name="phone" value={address.phone} onChange={handleFieldChanges} placeholder="Enter phone" />
                            {Object.keys(phoneError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {phoneError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>
                    </Col>

                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Street</Form.Label>
                            <Form.Control type="text" name="street" value={address.street} onChange={handleFieldChanges} placeholder="Enter street" />
                            {Object.keys(streetError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {streetError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>

                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name="city" value={address.city} onChange={handleFieldChanges} placeholder="Enter city" />
                            {Object.keys(cityError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {cityError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>
                    </Col>

                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Zip code</Form.Label>
                            <Form.Control type="number" name="zip" value={address.zip} onChange={handleFieldChanges} placeholder="Enter zip" />
                            {Object.keys(zipError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {zipError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>
                    </Col>
                </Row>

                <Button id="add-card" className="btn btn-dark" size="lg" type="submit" variant="dark">Add Payment Card</Button>
            </Form>


        </Container>
    );
}

