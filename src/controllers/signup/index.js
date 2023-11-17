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


    const login = async (user) => {
        const response = await PostClient("/auth/signup", user);
        if (response.status == 200) {
            dispatch({ type: "login", user: response.data })
            navigate("/");
        }
    }

    const submitLogin = async (e) => {
        e.preventDefault();
        // TODO: validate user
        console.log("submit login");
        await login(user);

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
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" placeholder="Last name" name="lastName" value={user.lastName} onChange={handleFieldChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={handleFieldChange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" value={user.password} onChange={handleFieldChange} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </Form>

                </Col>
                <Col md={4}></Col>

            </Row>
        </Container>

    );
}
