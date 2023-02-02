import { Card, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import Image1 from "./../../../src/assets/images/watch.webp";
import defaultImage from "./../../../src/assets/images/watch.webp";
export const ProductCardView = ({ productDetail }) => {
  const showDefault = (e) => {
    e.target.src = defaultImage;
  };
  let cats = productDetail.categories.map((item) => item.name);
  return (
    <>
      <Card>
        <Card.Img
          variant="top"
          src={
            productDetail?.images[0]
              ? process.env.REACT_APP_IMAGE_URL +
                "product/" +
                productDetail.images[0]
              : defaultImage
          }
          onError={showDefault}
        />
        <Card.Body>
          <Card.Title>
            <NavLink to={`/product/${productDetail.slug}`}>
              <h6
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {productDetail.title}
              </h6>
            </NavLink>
          </Card.Title>
          <Card.Text>
            <span className="me-3">
              <small>
                <em>{cats.join(", ")}</em>
              </small>
            </span>
            <Badge bg="success">{productDetail.brand?.title}</Badge>
            <br />
            <span>
              Npr. {productDetail.actual_price}
              {productDetail.discount > 0 ? (
                <>
                  <del className="px-2 text-danger">
                    Npr. {productDetail.price}
                  </del>
                </>
              ) : (
                <></>
              )}
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
