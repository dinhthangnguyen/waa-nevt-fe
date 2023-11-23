import React, { useState, useEffect } from "react";
import './index.css'
import { Button, Col, Container, FloatingLabel, Form, InputGroup, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import useAPI from "../../../../api";
import { useParams } from "react-router-dom";
export const Review = () => {
  const user = useSelector(state => state.user)
  const { PostClient, GetClient } = useAPI();
  const emptyData = { comment: "", email: "", productNumber: "" };
  const [review, setReview] = useState(emptyData);
  const [isAvailable, setIsAvailable] = useState(true);
  const [reviewList, setReviewList] = useState([]);

  const onComment = async (e) => {
    e.preventDefault();
    console.log(review);
    const response = await PostClient("/api/reviews", review, user.token);
    if (response.status === 200) {
      await loadReview(params.sku, user.email);
      await availableForReview(params.sku, user.email);
      await loadReviewList(params.sku);
      setReview(emptyData);
    }
  }

  const params = useParams();

  const loadReview = async (sku, email) => {
    const response = await GetClient(`/api/reviews/${sku}/${email}`, user.token);
    if (response.status === 200) {
      setReview(response.data);
    }
  }

  const availableForReview = async (sku, email) => {
    const response = await GetClient(`/api/orders/check-ordered/${sku}/${email}`, user.token);
    if (response.status === 200) {
      console.log(response.data)
      setIsAvailable(response.data);
    }
  }

  const loadReviewList = async (sku) => {
    const response = await GetClient(`/api/reviews/${sku}`);
    if (response.status === 200) {
      setReviewList(response.data);
    }
  }

  useEffect(() => {

    async function fetching() {
      await loadReview(params.sku, user.email);
      await availableForReview(params.sku, user.email);
      await loadReviewList(params.sku);
    }
    if (user)
      fetching();
  }, [params])




  const handleOnChange = (e) => {
    console.log(review);
    setReview({ ...review, [e.target.name]: e.target.value })
  }

  return (
    <>
      {isAvailable &&
        <Container className="text-center" style={{ marginTop: "100px" }}>

          <Row>
            <h3> Your review</h3>
          </Row>
          <Form onSubmit={onComment}>
            <Row>
              <Col lg={3}></Col>
              <Col lg={6}>

                <Form.Group className="mb-3" >
                  <FloatingLabel label="Your review matters">
                    <Form.Control
                      id="car-review-comment"
                      onChange={handleOnChange}
                      disabled={review.id}
                      name="comment"
                      value={review.comment}
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: '100px' }}
                    />
                  </FloatingLabel>

                </Form.Group>
              </Col>
              <Col lg={3}></Col>
            </Row>

            <Button id="add-review"
              disabled={review.id}
              className="btn btn-dark"
              size="lg"
              type="submit"
              variant="dark">Write a review</Button>
          </Form>
        </Container>}

        <Container className="text-center" style={{ marginTop: "20px" }}>
          <Row>
            <h3> All Reviews</h3>
          </Row>
          <Row>

            <Col lg={3}></Col>
            <Col lg={6}>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Review</th>
                  </tr>
                </thead>
                <tbody id="review-table">
                  {
                    reviewList.map(o => (
                      <tr key={o.email}>
                        <td>{o.email}</td>
                        <td>{o.comment}</td>
                      </tr>

                    ))
                  }

                </tbody>
              </Table>
            </Col>
            <Col lg={3}></Col>
          </Row>
        </Container>
    </>
  );
}
