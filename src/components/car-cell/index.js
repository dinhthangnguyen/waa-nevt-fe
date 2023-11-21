import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { host } from "../../api";
import useAPI from "../../api";
import { useSelector } from "react-redux";

export const CarCell = ({ car, isManage, reloadAfterDelete }) => {
    const navigate = useNavigate();
    const { DeleteClient } = useAPI();
    const user = useSelector(state => state.user);
    const open = (e) => {
        e.preventDefault();
        navigate("/cars/"+ e.target.value);
    }
    const previewCar = (e) => {
        e.preventDefault();
        navigate("/cars/"+ e.target.value);
    }
    const editCar = (e) => {
        e.preventDefault();
        navigate("/manage-car/car/"+ e.target.value);
    }
    const deleteCar = (e) => {
        e.preventDefault();
        removeCar(e.target.value);
    }
    const removeCar = async (sku) => {
        const response = await DeleteClient(`/api/cars/${sku}`, user.token);
        if (response.status == 204) {
            reloadAfterDelete();
        }
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
                {
                    isManage ?
                        (
                            <>
                                <Button onClick={previewCar} value={car.productNumber} className="mt-auto btn btn-dark non-border-button">Preview</Button>
                                <Button onClick={editCar} value={car.productNumber} className="mt-auto btn btn-dark non-border-button">Edit</Button>                           
                                <Button onClick={deleteCar} value={car.productNumber} className="mt-auto btn btn-dark non-border-button">Delete</Button>
                            </>
                    )
                    : 
                        (<Button onClick={open} value={car.productNumber} className="mt-auto btn btn-dark non-border-button">Buy Now!</Button>)
                    
                }
                
            </Card.Body>
        </Card>
    )
}
