import { useState, Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./index.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const AddCarAttributeForm = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inittialCar = useSelector(state => state.car);

  const [car, setCar] = useState(inittialCar);

  const [attributeTypes, setAttributeTypes] = useState([{ type: '', values: [{ value: '', price: 0 }] }]);

  const handleInputChange = (typeIndex, valueIndex, event) => {
    const { name, value } = event.target;
    const updatedAttributeTypes = [...attributeTypes];
    if(name === "attributeType")
      updatedAttributeTypes[typeIndex].type = value;
    else
      updatedAttributeTypes[typeIndex].values[valueIndex][name] = value;
    setAttributeTypes(updatedAttributeTypes);
  };

  const addAttributeType = () => {
    setAttributeTypes([...attributeTypes, { type: '', values: [{ value: '', price: 0 }] }]);
  };

  const addAttributeValue = (typeIndex) => {
    const updatedAttributeTypes = [...attributeTypes];
    updatedAttributeTypes[typeIndex].values.push({ value: '', price: 0 });
    setAttributeTypes(updatedAttributeTypes);
  };


  const handleOnSubmit = (e) => {
    console.log(attributeTypes);
    setCar({...car, attributeTypes});
    console.log(car);
    dispatch({ type : 'addcar', car});
    navigate("/manage-car/images");
  }

  return (
    <Container className="box">
      <Row><Col className="text-center"><h2>Set Up Attribute</h2></Col></Row>
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <Form onSubmit={handleOnSubmit}>
            {attributeTypes.map((attribute, typeIndex) => (
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
                {attribute.values.map((value, valueIndex) => (
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
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Price"
                          name={`price`}
                          value={value.price}
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
            <Button type="submit" className="mt-auto btn btn-dark non-border-button">Next Step(2/4)</Button>
          </Form>
        </Col>
        <Col md={4}></Col>

      </Row>
    </Container >
  );
}
