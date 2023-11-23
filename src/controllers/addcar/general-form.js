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

    const [nameError, setNameError] = useState({});
    const [basePriceError, setBasePriceError] = useState({});
    const [descriptionError, setDecriptionError] = useState({});
    const [yearError, setYearError] = useState({});
    const [modelError, setModelError] = useState({});
    const [makeError, setMakeError] = useState({});
    const [stockQuantityError, setStockQuantityError] = useState({});
    const [car, setCar] = useState(useSelector(state => state.car));
    useEffect(() => {
        const loadCar = async (sku) => {
            const response = await GetClient("/api/cars/" + sku);
            if (response.status === 200) {
                setCar(response.data);
            }
        }
        if (params.sku) {
            loadCar(params.sku);
        }

    }, [params])

    const handleFieldChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (formValidation()) {
            dispatch({ type: 'manageCar', car });
            if (params.sku)
                navigate(`/manage-car/car/attribute/${params.sku}`);
            else
                navigate("/manage-car/car/attribute");
        }

    }

    const formValidation = () => {
        let validateE = { isValid: true };
        let nameE = {};
        let basePriceE = {};
        let descriptionE = {};
        let yearE = {};
        let modelE = {};
        let makeE = {};
        let stockE = {};

        if (car.name.trim().length < 2) {
            nameE.nameShort = "Name is too short";
            validateE.isValid = false;
        }
        if (parseInt(car.basePrice) <= 0 || car.basePrice === "") {
            basePriceE.basePriceNegative = "Base Price is not negative";
            validateE.isValid = false;
        }
        if (car.description.trim().length < 2) {
            descriptionE.descriptionShort = "Description is too short";
            validateE.isValid = false;
        }
        if (parseInt(car.year) <= 1900) {
            yearE.invalidYear = "Year has to be larger 1900";
            validateE.isValid = false;
        }
        if (car.model.trim().length < 2) {
            modelE.modelShort = "Model is too short";
            validateE.isValid = false;
        }
        if (car.make.trim().length < 2) {
            makeE.makeShort = "Make is too short";
            validateE.isValid = false;
        }
        if (parseInt(car.stockQuantity) <= 0) {
            stockE.stockENegative = "Stock Quantity is not negative";
            validateE.isValid = false;
        }

        setNameError(nameE.nameShort);
        setBasePriceError(basePriceE.basePriceNegative);
        setDecriptionError(descriptionE.descriptionShort);
        setYearError(yearE.invalidYear);
        setModelError(modelE.modelShort);
        setMakeError(makeE.makeShort);
        setStockQuantityError(stockE.stockENegative);

        console.log(nameError);
        console.log(basePriceError);
        console.log(descriptionError);
        console.log(yearError);
        console.log(modelError);
        console.log(makeError);
        console.log(stockQuantityError);
        return validateE.isValid;
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
                            {Object.keys(nameError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {nameError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicBasePrice">
                            <Form.Label>Base Price</Form.Label>
                            <Form.Control type="number" placeholder="Base Price" name="basePrice" value={car.basePrice} onChange={handleFieldChange} />
                            {Object.keys(basePriceError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {basePriceError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" name="description" value={car.description} onChange={handleFieldChange} />
                            {Object.keys(descriptionError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {descriptionError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Control type="number" placeholder="Year" name="year" value={car.year} onChange={handleFieldChange} />
                            {Object.keys(yearError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {yearError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicModel">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" placeholder="Model" name="model" value={car.model} onChange={handleFieldChange} />
                            {Object.keys(modelError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {modelError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicMake">
                            <Form.Label>Make</Form.Label>
                            <Form.Control type="text" placeholder="Make" name="make" value={car.make} onChange={handleFieldChange} />
                            {Object.keys(makeError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {makeError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicStockQuantity">
                            <Form.Label>Stock Quantity</Form.Label>
                            <Form.Control type="number" placeholder="Stock Quantity" name="stockQuantity" value={car.stockQuantity} onChange={handleFieldChange} />
                            {Object.keys(stockQuantityError).map(key => (
                                <Form.Text className="text-danger" key={key}>
                                    {stockQuantityError[key]}
                                </Form.Text>
                            ))}
                        </Form.Group>
                    </Form>

                </Col>
                <Col md={4}></Col>

            </Row>
        </Container>

    );
}
