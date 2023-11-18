import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./index.css"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AddCarGeneralForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [car, setCar] = useState(
        {
            name: "", 
            basePrice: "", 
            description: "", 
            year: 0, 
            model: "", 
            make: "", 
            stockQuantity:0
        });

    const handleFieldChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch({ type : 'manageCar', car});
        navigate("/manage-car/attribute");
      }

    return (

        <Container className="box">
            <Row><Col className="text-center"><h2>Fill general information</h2></Col></Row>
            <Row>
                <Col md={4}></Col>
                <Col md={4}>
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" name="name" value={car.name} onChange={handleFieldChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicBasePrice">
                            <Form.Label>Base Price</Form.Label>
                            <Form.Control type="number" placeholder="Base Price" name="basePrice" value={car.basePrice} onChange={handleFieldChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" name="description" value={car.description} onChange={handleFieldChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Control type="number" placeholder="Year" name="year" value={car.year} onChange={handleFieldChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicModel">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" placeholder="Model" name="model" value={car.model} onChange={handleFieldChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicMake">
                            <Form.Label>Make</Form.Label>
                            <Form.Control type="text" placeholder="Make" name="make" value={car.make} onChange={handleFieldChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicStockQuantity">
                            <Form.Label>Stock Quantity</Form.Label>
                            <Form.Control type="number" placeholder="Stock Quantity" name="stockQuantity" value={car.stockQuantity} onChange={handleFieldChange} />
                        </Form.Group>
                        <Button type="submit" className="mt-auto btn btn-dark non-border-button">Next Step(1/3)</Button>
                    </Form>

                </Col>
                <Col md={4}></Col>

            </Row>
        </Container>

    );
}
