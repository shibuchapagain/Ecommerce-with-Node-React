import { useCallback, useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  Container,
  Row,
  Col,
  Badge,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { product_svc } from "../../../services/product.service";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart } from "../../../reducers/cart.reducers";

const ProductDetail = () => {
  let [detail, setDetail] = useState();
  let params = useParams();
  let [qty, setQty] = useState(0);

  const dispatch = useDispatch();

  const getProductDetail = useCallback(async () => {
    try {
      let response = await product_svc.getProductBySlug(params.slug);
      if (response.result) {
        setDetail(response.result[0]);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const addToCart = (e) => {
    e.preventDefault();
    let currentItem = {
      product_id: detail._id,
      qty: qty,
    };
    dispatch(setCart(currentItem));
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <>
      <Container className="my-5">
        {detail ? (
          <>
            <Row className="bg-light">
              <Col sm={12} md={6}>
                <Carousel showThumbs={true} showIndicators={true}>
                  {detail.images &&
                    detail.images.map((item, index) => (
                      <div className="home-detail" key={index} url={item.link}>
                        <img
                          src={
                            process.env.React_APP_IMAGE_URL +
                            "product/" +
                            item.image
                          }
                        />
                      </div>
                    ))}
                </Carousel>
              </Col>
              <Col sm={12} md={6} className="py-3">
                <h4 className="text-center">{detail.title}</h4>
                <hr />
                <p>
                  <span className="me-3">
                    {detail.categories.map((item) => item.name).join(", ")}
                  </span>
                  <Badge bg="warning">{detail.brand?.title}</Badge>
                </p>
                <hr />
                <p>
                  <span className="me-3">Npr. {detail.actual_price}</span>
                  {detail.discount > 0 ? (
                    <>
                      <del className="text-danger">Npr. {detail.price}</del>
                    </>
                  ) : (
                    <></>
                  )}
                </p>

                <Row>
                  <Col>
                    <Form onSubmit={addToCart}>
                      <Row>
                        <Col sm={12} md={4}>
                          <Form.Control
                            size="sm"
                            type="number"
                            min="0"
                            onChange={(e) => setQty(e.target.value)}
                          />
                        </Col>
                        <Col sm={12} md={4}>
                          <Button size="sm" type="submit" variant="warning">
                            <i className="fa fa-plus me-1"></i>Add to Cart
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="my-3 py-3 bg-light">
              <Col sm={12}>
                <h4>Product Description</h4>
                <hr />
              </Col>
              <Col
                dangerouslySetInnerHTML={{ __html: detail.description }}
              ></Col>
            </Row>
          </>
        ) : (
          <>
            <Alert className="my-3" variant="danger">
              Product doesnot exist
            </Alert>
          </>
        )}
      </Container>
    </>
  );
};

export default ProductDetail;
