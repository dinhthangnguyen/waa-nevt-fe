import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { host } from "../../api";

export const CarCell = ({ car }) => {
    const navigate = useNavigate();
    const open = (e) => {
        e.preventDefault();
        navigate("/cars/"+ e.target.value);
    }
    return (
        <Card className="car-card d-flex flex-column">
            <Card.Img className ="car-card-image flex-grow-1" variant="top" src={host + "/api/images/" + car.images[0]} />
            <Card.Body className="d-flex flex-column">
                <h5 className="card-text">
                    {car.name}
                </h5>
                <Card.Text className="limited-height-text">
                    {car.description}
                </Card.Text>
                <h5 className="card-text text-success">
                    {"$"}{car.basePrice}
                </h5>
                <Button onClick={open} value={car.productNumber} className="mt-auto btn btn-dark non-border-button">Buy Now!</Button>
            </Card.Body>
        </Card>
    )
}
