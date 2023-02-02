import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Table, Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { product_svc } from "./../../../services/product.service";
import { setCart } from "./../../../reducers/cart.reducers";
const CartDetail = () => {
  let dispatch = useDispatch();
  let cart = useSelector((store) => {
    console.log(store.cart.detail);
    return store.cart.detail;
  });

  let [cartDetail, setCartDetail] = useState();
  let [sum, setSum] = useState(0);

  const getCartDetail = useCallback(async (cart) => {
    try {
      let cartValue = await product_svc.getCartDetail(cart);
      if (cartValue) {
        setCartDetail(cartValue.result);
        sum = 0;
        cartValue.result.forEach((item) => {
          sum += Number(item.total_amt);
        });

        setSum(sum);
      }
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    if (cart && cart.length) {
      getCartDetail(cart);
    }
  }, [cart]);
  return (
    <>
      <Container className="my-5">
        <Row className="py-3 bg-light">
          <Col className="my-5">
            <h4 className="bg-secondary text-white py-3 ps-3">Cart Detail</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            {cartDetail ? (
              <>
                <Table>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartDetail.map((item, key) => (
                      <tr key={key}>
                        {" "}
                        <td>{item.name}</td>
                        <td>Npr. {item.price}</td>
                        <td>
                          <Button
                            variant="warning"
                            size="sm"
                            type="button"
                            className="btn-rounded"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(
                                setCart({
                                  product_id: item.product_id,
                                  qty: Number(item.qty) - 1,
                                })
                              );
                            }}
                          >
                            <i className="fa fa-minus" />
                          </Button>
                          &nbsp;
                          {item.qty}
                          &nbsp;
                          <Button
                            variant="warning"
                            size="sm"
                            type="button"
                            className="btn-rounded"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(
                                setCart({
                                  product_id: item.product_id,
                                  qty: Number(item.qty) + 1,
                                })
                              );
                            }}
                          >
                            <i className="fa fa-plus" />
                          </Button>
                        </td>
                        <td>{item.total_amt}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan={3}>Total Amount: </th>
                      <th>Npr. {sum}</th>
                    </tr>
                  </tfoot>
                </Table>
                <NavLink to="/checkout" className={"btn btn-success btn-sm"}>
                  Place an Order
                </NavLink>
              </>
            ) : (
              <Alert variant="warning">
                No item has been added in the cart.
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartDetail;
