import React from "react";
import "./index.css"
import { CarCell } from "../../components";
export const CarList = () => {

    const [cars, setCars] = useState([]);

    const { GetClient } = useAPI();

    useEffect(() => {
        async function fetchData() {
            const response = await GetClient("/api/cars");
            if (response.status === 200) {
                setCars(response.data);
            }
        }
        fetchData();
    }, []);

    return (
        <Container>
            {/* <Row><Col className="text-center"><h2>TODAY'S PICK</h2></Col></Row> */}
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