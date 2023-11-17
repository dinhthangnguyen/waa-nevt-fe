import React, { useEffect, useState } from "react";
import useAPI from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row, Button } from "react-bootstrap";
import { ImageGallery, OptionType } from "./components";
import { useDispatch } from "react-redux";
import "./index.css";

export const CarDetail = () => {
    const params = useParams();
    const { GetClient } = useAPI();
    const [car, setCar] = useState();
    const [number, setNumber] = useState(0);
    const [totalPrice, setTotalPrice] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetching() {
            await loadCar(params.sku);
        }
        fetching();
    }, [])

    const loadCar = async (sku) => {
        const response = await GetClient("/api/cars/" + sku);
        if (response.status === 200) {
            setCar(response.data);
            setTotalPrice(response.data.basePrice);
        }
    }

    const selectAtrribute = (data) => {
        console.log(data.type);
        let temp = { ...car };
        let index = temp.attributeTypes.findIndex(e => e.type === data.type);
        let typeItem = temp.attributeTypes[index];
        typeItem.items = typeItem.items.map(a => {
            return { ...a, selected: false };
        })

        let itemIndex = typeItem.items.findIndex(e => e.value === data.attribute.value);
        let attribute = { ...typeItem.items[itemIndex], selected: true };
        typeItem.items[itemIndex] = attribute;
        temp.attributeTypes[index] = typeItem;
        setCar(temp);
        calculateTotalPrice(temp);
    }

    const calculateTotalPrice = (car) => {
        let price = car.basePrice;
        car.attributeTypes.forEach(type => {
            type.items.filter(e=> e.selected === true).forEach(item => {
                price += item.additionalPrice;
            })
        });
        setTotalPrice(price);
    }

    const open = (e) => {
        e.preventDefault();
        dispatch({ type: "addcart", item: car, number: number })
        navigate("/carts");
    }

    return (
        <div className="car">
            {car && (
                <Container>
                    <Row className="car-header">
                        <div>
                            <h1 id="carName">{car.name.toUpperCase()}</h1>
                        </div>
                        <div>
                            <h3 className="text-danger" id="rentPrice">Starting Price: $ {car.basePrice}</h3>
                        </div>

                        <div>
                            <p className="text-success" id="carDescription">{car.description}</p>
                        </div>
                    </Row>

                    <Row>
                        <ImageGallery images={car.images} firstHalf={true} />
                        <ImageGallery images={car.images} firstHalf={false} />
                    </Row>

                    <Row className="text-center">
                        {car.attributeTypes.map(attributeType => (
                            <Col lg={12} className="mb-6 mb-lg-0" id={attributeType.type} >
                                <OptionType attributeType={attributeType} selectAtrribute={selectAtrribute} />
                            </Col>
                        ))}
                    </Row>

                    <Row>
                        <Col xs={12} className="mb-6 mb-lg-0 text-center"  >
                            <h4 id="total" className="card-title">Total Price: <span className="text-success">${totalPrice}</span> </h4> 
                   

                        </Col>

                        <Col lg={3}/>
                        <Col lg={6} className=" gap-2 text-center addcart">
                         <Button onClick={open} size="lg" variant="dark">Add To Cart</Button>
                        </Col>
                        <Col lg={3}/>

                    </Row>

                </Container>
            )}
        </div>

    )

}
