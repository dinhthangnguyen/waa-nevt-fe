import React, { useState, useEffect } from "react";
import './index.css'
import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import useAPI from "../../api";
import { useParams } from "react-router-dom";
export const StarRating = () => {
    const [hover, setHover] = useState(0);
    const user = useSelector(state => state.user)
    const { PostClient, GetClient } = useAPI();
    const [review, setReview] = useState({rating:0,comment:"",email:"",productNumber:""});
    const onComment = async () => {
        await reviewCar();     
    }
    
    const params = useParams();

    useEffect(() => {
        const loadReview = async (sku, email) => {
            const response = await GetClient(`/api/ratings/${sku}/${email}`, user.token);
            if (response.status === 200) {
                setReview(response.data);
            }
        }

        async function fetching() {
            await loadReview(params.sku, user.email);
        }
        fetching();
    }, [params])

    

    const reviewCar = async () => {
        const response = await PostClient("/api/ratings", review, user.token);
        return response.status === 200;
    }

    const handleOnChange = (e) => {
        console.log(review);
        setReview({...review, [e.target.name]:e.target.value})
    }

    const changeRating = (rating) => {
        console.log(review)
        setReview({...review, rating: rating})
    }

    return (
        <Container>
            <Col lg={2} />
            <Col lg={8}>
                <form >
                    <Row>
                        <div className="star-rating">
                            {[...Array(5)].map((index) => {
                                index += 1;
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        name="rating"
                                        value={index}
                                        className={index <= (((review.rating ? review.rating : 0) && hover) || hover) ? "on" : "off"}
                                        onClick={() => changeRating(index)}
                                        onMouseEnter={() => setHover(index)}
                                        onMouseLeave={() => setHover((review.rating ? review.rating : 0))}
                                    >
                                        <span className="star">&#9733;</span>
                                    </button>
                                );
                            })}
                        </div>

                    </Row>
                    <Row>
                        <Col md={8}><textarea id="comment" placeholder="Write your review here" rows="2" cols={70} name="comment" value={review.comment} onChange={handleOnChange} ></textarea></Col>
                        <Col md={2}><Button onClick={onComment} className="btn btn-dark btn btn-dark btn-lg" size="lg" variant="dar">Comment</Button></Col>   
                    </Row>
                </form>
            </Col>
            <Col lg={2} />

        </Container>

    );
}
