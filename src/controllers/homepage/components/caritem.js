import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const ViewCarItem = ({ car }) => {
    return (
        <Card className="car-card d-flex flex-column">
            <Card.Img className ="car-card-image flex-grow-1" variant="top" src={car.images[0]} />
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
                <a href='#' className="mt-auto btn btn-dark non-border-button">Buy Now!</a>
            </Card.Body>
        </Card>
    )
}
