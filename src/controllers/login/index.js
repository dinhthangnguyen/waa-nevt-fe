import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./index.css"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAPI from "../../api";

export const Login = () => {
    const initialData = { email: "", password: "" };
    const [user, setUser] = useState(initialData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { PostClient } = useAPI();

    const [emailError, setEmailError] = useState({});
    const [passError, setPassError] = useState({});

    const login = async (user) => {
        const response = await PostClient("/auth/signin", user);
        if (response.status == 200) {
            dispatch({ type: "login", user: response.data })
            navigate("/");
        }
    }

    const submitLogin = async (e) => {
        e.preventDefault();
        if (formValidation()) {
            console.log("submit login");
            await login(user);
        }
    }

    const formValidation = () => {
        let validateE = { isValid: true };
        let passE = {};
        let emailE = {};

        let eRegex = new RegExp("^[a-zA-Z]+\@[a-zA-Z]+\.[a-zA-Z]{2,}$");
        if (!eRegex.test(user.email.trim())) {
            emailE.wrongFormat = "Email format incorrect";
            validateE.isValid = false;
        }

        if (user.password.trim().length < 2) {
            passE.passShort = "Password is too short";
            validateE.isValid = false;
        }

        setPassError(passE);
        setEmailError(emailE);

        return validateE.isValid;
    }

    const handleFieldChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (

        <Container className="box">
            <Row><Col className="text-center"><h2>Log In</h2></Col></Row>
            <Row>

                <Col md={4}></Col>
                <Col md={4}>
                    <Form onSubmit={submitLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={handleFieldChange} />
                            {Object.keys(passError).length === 0 &&
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

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                </Col>
                <Col md={4}></Col>

            </Row>
        </Container>

    );
}


