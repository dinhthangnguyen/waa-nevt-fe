import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./index.css"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAPI from "../../api";

export const Signup = () => {
    const initialData = { email: "", password: "", firstName: "", lastName: "" };
    const [user, setUser] = useState(initialData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { PostClient } = useAPI();

    const [firstNameError, setFirstNameError] = useState({});
    const [lastNameError, setLastNameError] = useState({});
    const [emailError, setEmailError] = useState({});
    const [passError, setPassError] = useState({});

    const signup = async (user) => {
        const response = await PostClient("/auth/signup", user);
        if (response.status == 200) {
            dispatch({ type: "login", user: response.data })
            navigate("/");
        }
    }

    const submitLogin = async (e) => {
        e.preventDefault();
        if (formValidation()) {
            await signup(user);
        }
    }

    const formValidation = () => {
        let validateE = { isValid: true };
        let passE = {};
        let emailE = {};
        let firstNameE = {};
        let lastNameE = {};

        let eRegex = new RegExp("^[a-zA-Z]+\@[a-zA-Z]+\.[a-zA-Z]{2,}$");
        if (!eRegex.test(user.email.trim())) {
            emailE.wrongFormat = "Email format incorrect";
            validateE.isValid = false;
        }

        let passRegex = new RegExp("(?=.*[A-Z])(?=.*[0-9])(?=[a-z]*).{6,}")
        if (!passRegex.test(user.password.trim())) {
            passE.wrongFormat = "Password need to be lower case, upper case, number and at least 6 chars";
            validateE.isValid = false;
        }

        if (user.firstName.trim().length < 2) {
            firstNameE.firstShort = "First name is too short";
            validateE.isValid = false;
        }

        if (user.lastName.trim().length < 2) {
            lastNameE.lastShort = "First name is too short";
            validateE.isValid = false;
        }

        setPassError(passE);
        setEmailError(emailE);
        setFirstNameError(firstNameE);
        setLastNameError(lastNameE);
        return validateE.isValid;
    }


    const handleFieldChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (

        <Container className="box">
            <Row><Col className="text-center"><h2>Sign Up</h2></Col></Row>
            <Row>
                <Col md={4}></Col>
                <Col md={4}>
                    <Form onSubmit={submitLogin}>
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" placeholder="First name" name="firstName" value={user.firstName} onChange={handleFieldChange} />
                            {Object.keys(firstNameError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {firstNameError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" placeholder="Last name" name="lastName" value={user.lastName} onChange={handleFieldChange} />
                            {Object.keys(lastNameError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {lastNameError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={handleFieldChange} />
                            {Object.keys(emailError).length === 0 &&
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>}
                            {Object.keys(emailError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {emailError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" value={user.password} onChange={handleFieldChange} />
                            {Object.keys(passError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {passError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>

                        <Button id="signupButton" variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </Form>

                </Col>
                <Col md={4}></Col>

            </Row>
        </Container>

    );
}
