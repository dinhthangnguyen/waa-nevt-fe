import React, { useState, useEffect } from "react";
import './index.css'
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import useAPI from "../../../../api";
import { useParams } from "react-router-dom";
export const ReviewList = () => {
    const { GetClient } = useAPI();
    const [reviewList, setReviewList] = useState([]);

    const params = useParams();

    useEffect(() => {
        const loadReviewList = async (sku) => {
            const response = await GetClient(`/api/reviews/${sku}`);
            if (response.status === 200) {
              setReviewList(response.data);
            }
        }

        async function fetching() {
            await loadReviewList(params.sku);
        }
        fetching();
    }, [])

    return (
      <Container>
      <h3>All reviews</h3>
      <Col lg={2} />
            <Col lg={8}>
              <Form>
              {
                reviewList.map(o => (
                  <Row>
                    <Form.Label>{o.email}</Form.Label>
                    <Form.Control disabled="true" value={o.comment} />
                    <hr/> 
                    <hr/> 
                  </Row>
                         
                ))
              }
              </Form>
            </Col>
            <Col lg={2} />
      </Container>
      );
}
