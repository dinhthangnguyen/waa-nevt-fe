import React, { useState, useEffect } from "react";
import './index.css'
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import useAPI from "../../../../api";
import { useParams } from "react-router-dom";
export const Review = () => {
    const user = useSelector(state => state.user)
    const { PostClient, GetClient } = useAPI();
    const [review, setReview] = useState({ rating: 0, comment: "", email: "", productNumber: "" });
    const [isAvailable, setIsAvailable] = useState(true);
    const onComment = async () => {
        await reviewCar();
    }

    const params = useParams();

    useEffect(() => {
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



        async function fetching() {
            await loadReview(params.sku, user.email);
            await availableForReview(params.sku, user.email);
        }
        if (user)
            fetching();
    }, [params])



    const reviewCar = async () => {
        const response = await PostClient("/api/reviews", review, user.token);
        return response.status === 200;
    }

    const handleOnChange = (e) => {
        console.log(review);
        setReview({ ...review, [e.target.name]: e.target.value })
    }

    return (
        isAvailable ? (
          <Container>
            <Col lg={2} />
            <Col lg={8}>
              <form>
                <Row>
                  <Col md={8}><textarea disabled={review.id} id="comment" placeholder="Write your review here" rows="2" cols={70} name="comment" value={review.comment} onChange={handleOnChange}></textarea></Col>
                  <Col md={2}><Button onClick={onComment} disabled={review.id} className="btn btn-dark btn btn-dark btn-lg" size="lg" variant="dark">Comment</Button></Col>
                </Row>
              </form>
            </Col>
            <Col lg={2} />
          </Container>
        ) : (
          <></>
        )
      );
}
