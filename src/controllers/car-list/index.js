import React, { useEffect, useState } from "react";
import "./index.css"
import { CarCell } from "../../components";
import useAPI from "../../api";
import { Container, Row, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
export const CarList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [cars, setCars] = useState([]);
    console.log();
    const { GetClient } = useAPI();

    useEffect(() => {
        async function fetchData() {
            let path = searchParams.get("search") ?  "/api/cars?searchKey=" + searchParams.get("search") : "/api/cars"
            const response = await GetClient(path);
            if (response.status === 200) {
                setCars(response.data);
            }
        }
        fetchData();
    }, []);

    return (
        <Container>
            <Row><Col className="text-center"><h2>All Cars</h2></Col></Row>
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