import React, { useEffect, useState } from "react";
import useAPI from "../../api";
import { useParams } from "react-router-dom";
import { Col, Container, Row, Image } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import "./index.css";
import ListGroup from 'react-bootstrap/ListGroup';

const ImageGallery = ({ images, firstHalf }) => {
    const [imageSet, setImageSet] = useState([]);
    useEffect(() => {
        const size = parseInt(images.length / 2);
        if (firstHalf) {
            let temp = [];
            for (let index = 0; index <= size; index++) {
                temp.push(images[index]);
            }
            setImageSet(temp);
        } else {
            console.log("right: " + size);
            let temp = [];
            for (let index = size + 1; index < images.length; index++) {
                temp.push(images[index]);
            }
            setImageSet(temp);
        }
    }, [images, firstHalf]);

    return (
        <Col lg={6} className="mb-6 mb-lg-0" id={firstHalf ? "leftGallery" : "rightGalery"} >
            {imageSet.map(e => {
                return <Image key={e} src={e} rounded className="w-100 shadow-1-strong mb-4" />
            })}
        </Col>
    )
}

const AtributeType = ({ attributeType, selectAtrribute }) => {
    return (
        <div >
            <h1 id="attributeType">{attributeType.type.toUpperCase()} OPTIONS</h1>
            <div className="box">
                {attributeType.items.map(e => {
                    return <div className="cell" key={e.value}>
                        <h5 className="card-text text-success">
                            {e.value}
                        </h5>
                        <div>
                            {e.additionalPrice}
                        </div>
                    </div>
                    // return <Form.Check // prettier-ignore
                    //     inline
                    //     type={"radio"}
                    //     id={e.value}
                    //     label={`${e.value} ${e.additionalPrice}`}
                    // />

                })}
            </div>
        </div>
    )
}

export const CarDetail = () => {
    const params = useParams();
    const { GetClient } = useAPI();
    const [car, setCar] = useState();

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
            console.log(response.data);
        }
    }
    return (
        <div className="car">
            {car && (
                <Container>
                    <Row>
                        <div>
                            <h1 id="carName">{car.name.toUpperCase()}</h1>

                        </div>
                        <div>
                            <h3 className="text-danger" id="rentPrice">$ {car.basePrice}</h3>
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
                                <AtributeType attributeType={attributeType} />
                            </Col>
                        ))}
                    </Row>

                </Container>
            )}
        </div>

    )

}
