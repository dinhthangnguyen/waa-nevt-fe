import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Login = () => {
    const initialData = {email: "", password: ""};
    const [user, setUser] = useState(initialData);

    const client = axios.create({
        baseURL: "http://localhost:8080/auth/signin"});

    useEffect(() => {
        
    }, [])


    const login = async (user) => {
        const config = {
            headers: {
                "Content-Type": "Application/json"
            }
        }
        const response = await client.post("http://localhost:8080/auth/signin",user,config);
        if (response.status == 200) {
            console.log(response.data);
        }
    }

    const submitLogin = async (e) => {
        e.preventDefault();
        // TODO: validate user

        console.log("submit login");
        let temp = await login(user);

    }

    const handleFieldChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (

        <Container>
            <Row>
                <Col xs={3}></Col>
                <Col xs={6}>
                    <Form onSubmit={submitLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={handleFieldChange}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" value={user.password} onChange={handleFieldChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                </Col>
                <Col xs={3}></Col>

            </Row>
            {/* <Row>
                <Col>
                    <h2>Log In</h2>
                    <form action={submitLogin}>
                        <input type="text" required placeholder="Email" />
                        <input type="password" required placeholder="password" />
                        <button type="submit">LogIn</button>
                    </form>
                </Col>
            </Row> */}
        </Container>

    );
}

export default Login;

