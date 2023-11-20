import React, { useEffect, useState } from "react";
import useAPI from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
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
    const [select, setSelect] = useState(false);

    useEffect(() => {
        const loadCar = async (sku) => {
            const response = await GetClient("/api/cars/" + sku);
            if (response.status === 200) {
                setCar(response.data);
                setTotalPrice(response.data.basePrice);
            }
        }

        loadCar(params.sku);

    }, [params])


    const selectAtrribute = (data) => {
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
        calculateTotalPrice(temp, number);
    }

    const calculateTotalPrice = (car, number) => {
        let price = car.basePrice;
        car.attributeTypes.forEach(type => {
            type.items.filter(e => e.selected === true).forEach(item => {
                price += item.additionalPrice;
            })
        });
        setTotalPrice(price * number);
    }

    const addToCart = (e) => {
        e.preventDefault();
        dispatch({ type: "cart", item: { car: car, number: number, totalPrice: totalPrice } })
        navigate("/cart");
    }

    const numberChange = (e) => {
        e.preventDefault();
        const value = parseInt(e.target.value);
        if (value) {
            setSelect(true);
            setNumber(value);
            calculateTotalPrice(car, value);
        } else {
            setSelect(false);
        }
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
                            <h4 className={car.stockQuantity > 0 ? "text-info" : "text-secondary"} id="rentPrice">Stock: {car.stockQuantity}</h4>
                        </div>
                        <div>
                            <p className="text-success" id="carDescription">{car.description}</p>
                        </div>
                    </Row>

                    <Row>
                        <ImageGallery images={car.images} firstHalf={true} />
                        <ImageGallery images={car.images} firstHalf={false} />
                    </Row>
                </Container>
            )}

            {car && car.stockQuantity > 0 && (
                <Container>

                    <Row className="text-center">
                        {car.attributeTypes.map(attributeType => (
                            <Col lg={12} className="mb-6 mb-lg-0" id={attributeType.type} >
                                <OptionType attributeType={attributeType} selectAtrribute={selectAtrribute} />
                            </Col>
                        ))}
                    </Row>

                    <Row className="text-center">
                        <h5 id="title" className="card-title">HOW MANY DO YOU WANT TO BUY?</h5>

                        <Col lg={5} />
                        <Col lg={2} className="mb-6 mb-lg-0 text-center select"  >
                            <Form.Select onChange={numberChange} aria-label="Default select example">
                                <option>Select number</option>
                                <option value="1">1</option>
                                {car.stockQuantity >= 2 &&
                                    <option value="2">2</option>
                                }
                                {car.stockQuantity >= 3 &&
                                    <option value="3">3</option>
                                }
                                {car.stockQuantity >= 4 &&
                                    <option value="4">4</option>
                                }
                            </Form.Select>
                        </Col>
                        <Col lg={5} />
                    </Row>
                    <Row>
                        <Col xs={12} className="mb-6 mb-lg-0 text-center total" >
                            <h4 id="total" className="card-title">Total Price: <span className="text-success">${totalPrice}</span> </h4>
                        </Col>

                        <Col lg={3} />
                        <Col lg={6} className=" gap-2 text-center addcart">
                            <Button className="btn btn-dark" onClick={addToCart} disabled={!select} size="lg" variant="dark">Add To Cart</Button>
                        </Col>
                        <Col lg={3} />
                    </Row>
                </Container>
            )}
        </div>
    )

}
