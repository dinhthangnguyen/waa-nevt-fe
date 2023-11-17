import React, { useEffect, useState } from "react";
import useAPI from "../../api";
import { useParams } from "react-router-dom";
import { Col, Container, Row, Image } from "react-bootstrap";
import "./index.css";
import { ImageGallery } from "./components";

const AtributeType = ({ attributeType, selectAtrribute }) => {
    const select = (attribute) => {
        selectAtrribute({type: attributeType.type, attribute: attribute})
    }
    return (
        <div className="option">
            <h5 id="attributeType" className="card-title">{attributeType.type.toUpperCase()} OPTIONS</h5>
            <div className="a-content">
                {attributeType.items.map(e => {
                    return <div className={e.selected ? "cell-selected" : "cell"} key={e.value} onClick={select.bind(this,e)}>
                        <p className=" text-uppercase">
                            {e.value}
                        </p>
                        <p className={e.selected ? "": " text-success"}>${e.additionalPrice}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export const CarDetail = () => {
    const params = useParams();
    const { GetClient } = useAPI();
    const [car, setCar] = useState();
    const [selectedAttributes, SetSelectedAttributes] = useState([]);

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
        }
    }

    const selectAtrribute = (data) => {
        console.log(data.type);
        let temp = {...car};
        let index = temp.attributeTypes.findIndex(e=> e.type === data.type);
        let typeItem = temp.attributeTypes[index];
        typeItem.items = typeItem.items.map(a => {
            return {...a, selected: false};
        })

        let itemIndex = typeItem.items.findIndex(e=> e.value === data.attribute.value);
        let attribute = {...typeItem.items[itemIndex], selected: true};
        typeItem.items[itemIndex] = attribute;
        temp.attributeTypes[index] = typeItem;
        setCar(temp);
        console.log(car);
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
                                <AtributeType attributeType={attributeType} selectAtrribute={selectAtrribute} />
                            </Col>
                        ))}
                    </Row>

                </Container>
            )}
        </div>

    )

}
