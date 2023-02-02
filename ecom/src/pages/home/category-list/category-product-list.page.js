import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
// import category_svc from "./../../../components/admin/category/category.service";
import CategoryService from "./../../../components/admin/category/category.service";

// import product_svc from "./../../../components/admin/product/product.service";
import { ProductCardView } from "../product-card.component";
const category_svc = new CategoryService();
const CategoryProductList = () => {
  let params = useParams();
  let [category, setCategory] = useState();
  let [products, setProducts] = useState();

  const getCategoryDetail = useCallback(async () => {
    try {
      let response = await category_svc.getCategoryDetailBySlug(params.slug);
      console.log("IAM HERE");
      console.log(response);
      if (response) {
        setCategory(response.result.category);
        setProducts(response.result.product);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    getCategoryDetail();
  }, []);
  return (
    <>
      <Container>
        <Row className="my-5 bg-light">
          <Col sm={12}>
            <h4 className="text-center">
              ----ALL PRODUCT LIST OF <em>"{category?.name}"</em>----
            </h4>
          </Col>
        </Row>

        <Row className="bg-light my-5 py-3">
          {products ? (
            <>
              {products?.map((product, ind) => (
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

export default CategoryProductList;
