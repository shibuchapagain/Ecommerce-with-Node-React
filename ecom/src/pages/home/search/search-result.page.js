import { Container, Row, Col, Alert } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { ProductCardView } from "../product-card.component";
import { useCallback, useEffect, useState } from "react";
// import product_svc from "./../../../components/admin/product/product.service";
import { product_svc } from "../../../services/product.service";

const SearchResult = () => {
  let [query] = useSearchParams();
  let [searchResult, setSearchResult] = useState();
  const getSearchResult = useCallback(async (search) => {
    try {
      let result = await product_svc.listSearchData(search);

      if (result?.result) {
        setSearchResult(result?.result);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getSearchResult(query.get("q"));
  }, [query]);
  return (
    <>
      <Container>
        <Row className="my-5 p-3 bg-light">
          <Col sm={12} lg={6}>
            <h4>
              <em>Search Result of: "{query.get("q")}"</em>
            </h4>
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

export default SearchResult;
