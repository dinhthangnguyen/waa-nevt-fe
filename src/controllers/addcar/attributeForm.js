import { useState } from "react";
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

    const handleFieldChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch({ type : 'addcar', car});
        props.history.push("/managa-car/attribute");
      }
    
      const [carName, setCarName] = useState('');
      const [attributeTypes, setAttributeTypes] = useState([{ type: 'color', values: [{ valueName: '', price: '' }] }]);
    
      const handleInputChange = (typeIndex, valueIndex, event) => {
        const { name, value } = event.target;
        const updatedAttributeTypes = [...attributeTypes];
        updatedAttributeTypes[typeIndex].values[valueIndex][name] = value;
        setAttributeTypes(updatedAttributeTypes);
      };
    
      const addAttributeType = () => {
        setAttributeTypes([...attributeTypes, { type: '', values: [{ valueName: '', price: '' }] }]);
      };
    
      const addAttributeValue = (typeIndex) => {
        const updatedAttributeTypes = [...attributeTypes];
        updatedAttributeTypes[typeIndex].values.push({ valueName: '', price: '' });
        setAttributeTypes(updatedAttributeTypes);
      };
    
      const submitForm = () => {
        const formData = {
          carName,
          attributeTypes,
        };
    
        // Log or send formData to the server using fetch or another method
        console.log(formData);
    
        // Example: Send data to the server using fetch
        fetch('/your-server-endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            // Handle success response from the server
          })
          .catch((error) => {
            console.error('Error:', error);
            // Handle error
          });
      };

    return (
        <Container className="box">
            <div>
      <h2>Create Car Form</h2>
      <form>
        <label htmlFor="carName">Car Name:</label>
        <input
          type="text"
          id="carName"
          name="carName"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
          required
        />

        <div>
          {attributeTypes.map((attribute, typeIndex) => (
            <div key={typeIndex}>
              <label htmlFor={`attributeType${typeIndex}`}>Attribute Type:</label>
              <input
                id={`attributeType${typeIndex}`}
                name={`attributeType${typeIndex}`}
                value={attribute.type}
                onChange={(e) => handleInputChange(typeIndex, 0, e)} // Assumes only one value initially
              />

              {attribute.values.map((value, valueIndex) => (
                <div key={valueIndex}>
                  <label htmlFor={`valueName${typeIndex}_${valueIndex}`}>Value Name:</label>
                  <input
                    type="text"
                    id={`valueName${typeIndex}_${valueIndex}`}
                    name={`valueName${typeIndex}_${valueIndex}`}
                    value={value.valueName}
                    onChange={(e) => handleInputChange(typeIndex, valueIndex, e)}
                  />

                  <label htmlFor={`price${typeIndex}_${valueIndex}`}>Price:</label>
                  <input
                    type="text"
                    id={`price${typeIndex}_${valueIndex}`}
                    name={`price${typeIndex}_${valueIndex}`}
                    value={value.price}
                    onChange={(e) => handleInputChange(typeIndex, valueIndex, e)}
                  />
                </div>
              ))}
              <button type="button" onClick={() => addAttributeValue(typeIndex)}>Add Attribute Value</button>
            </div>
          ))}
        </div>

        <button type="button" onClick={addAttributeType}>Add Attribute Type</button>
        <button type="button" onClick={submitForm}>Create Car</button>
      </form>
    </div>
        </Container>

    );
}
