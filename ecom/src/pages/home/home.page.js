// export const HomePage = () => {
//   return <>shiva;</>;
// };

// export default HomePage; // not needed

// statefull --> className based:
// stateless --> functional component

// lets start:
import React from "react";
import "bootstrap";
import { Container, ListGroup, Row, Col, Image, Alert } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image1 from "./../../assets/images/watch.webp";
import HomeCategoryList from "../../components/home/category-list/category-list.component";
import { BannerListComponent } from "../../components/home/banner/banner-list.component";
import { useState, useCallback, useEffect } from "react";
import { ProductCardView } from "./product-card.component";
import { product_svc } from "../../services/product.service";
const HomePage = (props) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    arrows: true,
  };

  let [searchResult, setSearchResult] = useState();
  const getSearchResult = useCallback(async () => {
    try {
      let result = await product_svc.listSearchData("");
      if (result?.result) {
        setSearchResult(result?.result);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getSearchResult();
  }, []);

  return (
    <>
      <Container fluid>
        <Row className="mx-3">
          <Col md={2}>
            <ListGroup variant="flush">
              <HomeCategoryList />
            </ListGroup>
          </Col>
          <Col md={10}>
            <BannerListComponent />
          </Col>
        </Row>

        <Row className="my-3">
          <Slider {...settings}>
            <Col sm={6} md={1} className=" me-1">
              <NavLink to="/brand/slug">
                <Image src={Image1} fluid className="fluid-image px-1" />
              </NavLink>
            </Col>
            <Col sm={6} md={1} className=" me-1">
              <NavLink to="/brand/slug">
                <Image src={Image1} fluid className="fluid-image px-1" />
              </NavLink>
            </Col>
            <Col sm={6} md={1} className=" me-1">
              <NavLink to="/brand/slug">
                <Image src={Image1} fluid className="fluid-image px-1" />
              </NavLink>
            </Col>
            <Col sm={6} md={1} className=" me-1">
              <NavLink to="/brand/slug">
                <Image src={Image1} fluid className="fluid-image px-1" />
              </NavLink>
            </Col>
            <Col sm={6} md={1} className=" me-1">
              <NavLink to="/brand/slug">
                <Image src={Image1} fluid className="fluid-image px-1" />
              </NavLink>
            </Col>
            <Col sm={6} md={1} className=" me-1">
              <NavLink to="/brand/slug">
                <Image src={Image1} fluid className="fluid-image px-1" />
              </NavLink>
            </Col>
            <Col sm={6} md={1} className=" me-1">
              <NavLink to="/brand/slug">
                <Image src={Image1} fluid className="fluid-image px-1" />
              </NavLink>
            </Col>{" "}
            <Col sm={6} md={1} className=" me-1">
              <NavLink to="/brand/slug">
                <Image src={Image1} fluid className="fluid-image px-1" />
              </NavLink>
            </Col>{" "}
            <Col sm={6} md={1} className=" me-1">
              <NavLink to="/brand/slug">
                <Image src={Image1} fluid className="fluid-image px-1" />
              </NavLink>
            </Col>
          </Slider>
        </Row>

        <Row className="my-5 bg-light p-3">
          <Col sm={12}>
            <h4 className="text-center">-------All Products-------</h4>
          </Col>
        </Row>
        <Row className="bg-light">
          {searchResult ? (
            <>
              {searchResult?.map((product, ind) => (
                <Col sm={12} mc={6} lg={2} key={ind}>
                  <ProductCardView productDetail={product} />
                </Col>
              ))}
            </>
          ) : (
            <>
              <Alert variant="danger">
                <em>No result found!!</em>
              </Alert>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
