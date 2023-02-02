import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { product_svc } from "../../services/product.service";
import { toast } from "react-toastify";
import { resetCart } from "../../reducers/cart.reducers";

const Checkout = () => {
  // check login user!
  let navigate = useNavigate();
  let token = localStorage.getItem("_mern14_token") ?? null;
  let dispatch = useDispatch();
  const cart = useSelector((store) => {
    return store.cart.detail;
  });
  let placeOrder = useCallback(async () => {
    try {
      let response = await product_svc.createOrder({
        cart: cart,
        discount: 0,
        delivery_charge: 150,
        is_paid: false,
      });
      //   console.log(response, "response");
      if (response.status) {
        toast.success(
          "Your order has been placed successfully. You will be notified in short"
        );
        // localStorage.removeItem("cart");
        dispatch(resetCart());
        navigate("/customer");
      } else {
        toast.error(
          "Sorry! Your order could not be place at this time. Please try again"
        );
        navigate("/cart");
      }
    } catch (err) {
      toast.warning(err);
      navigate("/cart");
    }
  }, [cart]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      placeOrder();
    }
  }, [placeOrder]);
  return <></>;
};

export default Checkout;
