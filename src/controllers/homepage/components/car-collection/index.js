import React, { useState, useEffect } from "react";
import useAPI from "../../../../api";
import { Col, Container, Row } from "react-bootstrap";
import { CarCell } from "../../../../components";

export const CarCollection = ({title, apiPath}) => {

    const [cars, setCars] = useState([]);

    const { GetClient } = useAPI();

    useEffect(() => {
        async function fetchData() {
            const response = await GetClient(apiPath);
            if (response.status === 200) {
                setCars(response.data);
            }
        }
        fetchData();
    }, []);

    return (
        <Container>
            <Row><Col className="text-center"><h2 id="collection-title">{title}</h2></Col></Row>
            <Row>
                {cars.map((car) => (
                    <Col key={car.productNumber} sm={4}>
                        <CarCell car={car} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}