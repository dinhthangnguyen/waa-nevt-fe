import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ViewCarItem = ({ car }) => {

    return (
        <Card style={{ width: '18rem', height: '30rem' }}>
            <Card.Img variant="top" src={car.images[0]} />
            <Card.Body>
                <Card.Title>{car.name}</Card.Title>
                <Card.Text>
                    {car.description}
                </Card.Text>
                <Button variant="primary">Detail</Button>
            </Card.Body>
        </Card>
    )
}

export default ViewCarItem;