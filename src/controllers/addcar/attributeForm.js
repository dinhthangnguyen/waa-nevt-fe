import { useState, Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./index.css"

export const AddCarAttributeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inittialCar = useSelector(state => state.car);
  const [car, setCar] = useState({...inittialCar, attributeTypes: [{ type: '', items: [{ value: '', additionalPrice: 0 }] }]});

  const handleInputChange = (typeIndex, valueIndex, event) => {
    const { name, value } = event.target;
    const updatedAttributeTypes = [...car.attributeTypes];
    if(name === "attributeType")
      updatedAttributeTypes[typeIndex].type = value;
    else
      updatedAttributeTypes[typeIndex].items[valueIndex][name] = value;

    setCar({...car, attributeTypes: updatedAttributeTypes});
  };

  const addAttributeType = () => {
    const updatedAttributeTypes = [...car.attributeTypes, { type: '', items: [{ value: '', additionalPrice: 0 }] }];
    setCar({...car, attributeTypes: updatedAttributeTypes});
  };

  const addAttributeValue = (typeIndex) => {
    const updatedAttributeTypes = [...car.attributeTypes];
    updatedAttributeTypes[typeIndex].items.push({ value: '', additionalPrice: 0 });
    setCar({...car, attributeTypes: updatedAttributeTypes});
  };

  const handleOnSubmit = () => {
    console.log(car.attributeTypes);
 
    // setCar((prevCar) => {
    //   let carWithAttribute = {...prevCar, attributeTypes: attributeTypes};
    //   return carWithAttribute;
    // })

    console.log(car);
    dispatch({ type : 'manageCar', car});
    navigate("/manage-car/images");
  }

  return (
    <Container className="box">
      <Row><Col className="text-center"><h2>Set Up Attribute</h2></Col></Row>
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <Form onSubmit={handleOnSubmit}>
            {car.attributeTypes.map((attribute, typeIndex) => (
              <Fragment key={typeIndex}>
                <Form.Group className="mb-3" controlId={`attributeType${typeIndex}`}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type"
                    name={`attributeType`}
                    value={attribute.type}
                    onChange={(e) => handleInputChange(typeIndex, 0, e)}
                  />
                </Form.Group>
                {attribute.items.map((value, valueIndex) => (
                  <Row key={valueIndex}>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId={`value${typeIndex}_${valueIndex}`}>
                        <Form.Label>Value</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Value"
                          name={`value`}
                          value={value.name}
                          onChange={(e) => handleInputChange(typeIndex, valueIndex, e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId={`price${typeIndex}_${valueIndex}`}>
                        <Form.Label>Additional Price</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Additional Price"
                          name={`additionalPrice`}
                          value={value.additionalPrice}
                          onChange={(e) => handleInputChange(typeIndex, valueIndex, e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                ))}
                <Button type="button" className="mt-auto btn btn-info non-border-button" onClick={() => addAttributeValue(typeIndex)}>Add Attribute Value</Button>
              </Fragment>
            ))}
            <Button type="button" className="mt-auto btn btn-success non-border-button" onClick={addAttributeType}>Add Attribute Type</Button>
            <Button type="submit" className="mt-auto btn btn-dark non-border-button">Next Step(2/3)</Button>
          </Form>
        </Col>
        <Col md={4}></Col>

      </Row>
    </Container >
  );
}
