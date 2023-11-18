import { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import "./index.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import useAPI from "../../api";
export const AddCarImageForm = () => {
    const baseImageURL = "http://localhost:8080/api/images";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { PostClient } = useAPI();

    const inittialCar = useSelector(state => state.car);

    const [car, setCar] = useState(inittialCar);

    const [images, setImages] = useState([]);
    
    const [selectedFile, setSelectedFile] = useState(null);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'addcar', car });
        navigate("/manage-car/preview");
    }

    const uploadImage = async() => {
        if (!selectedFile) {
            // Handle the case where no file is selected
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await PostClient("/api/images/upload", formData);

        if (response.status === 200) {
            setImages([...images, response.data]);
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    }

    const showImagePreview = (image) => {
        const imagePreviewElement = document.getElementById("imagePreview");
        imagePreviewElement.setAttribute("src",baseImageURL + `/${image}`) 
        imagePreviewElement.removeAttribute("class")
        imagePreviewElement.style.maxWidth = '100%';
        imagePreviewElement.style.maxHeight = '500px';
        // Show the image preview
        imagePreviewElement.style.display = 'block';
    }

    return (

        <Container className="box">
            <Row><Col className="text-center"><h2>Upload Images</h2></Col></Row>
            <Row>
                <Col md={2}></Col>
                <Col md={8}>
                    <Row>
                        <Col className="component" md={5}>
                            <Table className="table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Operation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {images.map(image => (
                                        <tr>
                                            <td onClick={() => showImagePreview(image)}>{image}</td>
                                            <td><Image src="../images/delete-logo.png"/></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <hr />
                            <h3 className="text-center">Add Image</h3>
                            <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Select an image:</Form.Label>
                                <Form.Control
                                type="file"
                                id="imageUpload" name="imageUpload" accept="image/*" onChange={handleFileChange}/>
                                <Button type="button" className="mt-auto btn btn-info non-border-button" onClick={uploadImage}>Upload</Button>
                            </Form.Group>
                            </Form>
                        </Col>
                        <Col className="component" md={6}>
                            <Image src="" alt="Image Preview" id="imagePreview" className="d-none" fluid />
                        </Col>
                    </Row>
                    <Button type="button" onClick={handleOnSubmit} className="mt-auto btn btn-dark non-border-button">Next Step(3/4)</Button>
                </Col>               
                <Col md={2}></Col>
            </Row>
        </Container>

    );
}
