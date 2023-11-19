import React, { useState, useEffect } from "react";
import { ViewCarItem } from "./car-item";
import useAPI from "../../../api";
import { Col, Container, Row } from "react-bootstrap";

export const Trending = () => {

    const [cars, setCars] = useState([]);

    const { GetClient } = useAPI();

    useEffect(() => {
        async function fetchData() {
            const response = await GetClient("/api/cars/trending");
            if (response.status === 200) {
                setCars(response.data);
            }
        }
        fetchData();
    }, []);

    return (
        <Container>
            <Row><Col className="text-center"><h2>TRENDING</h2></Col></Row>
            <Row>
                {cars.map((car) => (
                    <Col key={car.productNumber} sm={4}>
                        <ViewCarItem car={car} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
