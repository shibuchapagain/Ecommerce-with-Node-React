import { Container, Row, Col, Alert } from "react-bootstrap";
import { ProductCardView } from "../product-card.component";
import { useState, useCallback, useEffect } from "react";
import { product_svc } from "../../../services/product.service";

const AllProductList = () => {
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
      <Container>
        <Row className="my-5 bg-light">
          <Col sm={12}>
            <h4 className="text-center">----ALL PRODUCT LIST----</h4>
          </Col>
        </Row>

        <Row className="my-5 bg-light">
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

          <ProductCardView />
        </Row>
      </Container>
    </>
  );
};

export default AllProductList;
