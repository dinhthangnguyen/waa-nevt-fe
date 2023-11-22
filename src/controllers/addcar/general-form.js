import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./index.css"
import useAPI from "../../api";
export const AddCarGeneralForm = () => {
    
    const params = useParams();
    const { GetClient } = useAPI();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [car, setCar] = useState(useSelector(state => state.car));
    useEffect(() => {
        const loadCar = async (sku) => {
            const response = await GetClient("/api/cars/" + sku);
                if (response.status === 200) {
                    setCar(response.data);
                } 
        }
        if(params.sku) {
            loadCar(params.sku);
        }

    }, [params])

    const handleFieldChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'manageCar', car });
        if(params.sku)
            navigate(`/manage-car/car/attribute/${params.sku}`);
        else
            navigate("/manage-car/car/attribute");
    }

    return (

        <Container className="box">
            <Row><Col className="text-center"><h2>Fill general information</h2></Col></Row>
            <Row>
                <Col md={4}></Col>
                <Col md={4}>
                    <Form onSubmit={handleOnSubmit}>
                        <Button type="submit" id="submit-general" className="mt-auto btn btn-dark non-border-button">Next Step(1/3)</Button>
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
                    </Form>

                </Col>
                <Col md={4}></Col>

            </Row>
        </Container>

    );
}
