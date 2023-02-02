const OrderModel = require("../model/order.model");
const ProductModel = require("../model/product.model");
const OrderService = require("../services/order.service");

class OrderController {
  constructor() {
    this.order_svc = new OrderService();
  }
  createOrder = async (req, res, next) => {
    try {
      let cart = req.body;
      let final_result = {
        user_id: req.auth_user._id,
        cart: [],
        sub_total: 0,
        delivery_charge: cart.delivery_charge,
        discount: cart.discount,
        total_amount: 0,
        status: "pending",
        is_paid: !!cart.is_paid,
      };
      let sub_cart = await this.order_svc.getCartProducts(cart.cart);
      final_result.cart = sub_cart.map((item) => {
        let current_item = cart.cart.filter((current_cart_item) =>
          item._id.equals(current_cart_item.product_id)
        );
        final_result.sub_total += Number(
          Number(current_item[0].qty) * item.actual_price
        );

        return {
          product_id: item._id,
          total_amt: Number(current_item[0].qty) * item.actual_price,
          qty: current_item[0].qty,
        };
      });

      final_result.total_amount =
        final_result.sub_total -
        final_result.discount +
        final_result.delivery_charge;

      console.log(JSON.stringify(final_result));

      let order = new OrderModel(final_result);
      await order.save();
      res.json({
        result: order,
        status: true,
        msg: " Your order has been placed.",
      });
    } catch (except) {
      next({ status: 400, msg: except });
    }
  };

  getCartDetail = async (req, res, next) => {
    try {
      let cart = req.body;
      console.log(cart, "cart body from controller");
      let sub_cart = await this.order_svc.getCartProducts(cart.cart);
      let final_result = [];
      final_result = sub_cart.map((item) => {
        let current_item = cart.cart.filter((current_cart_item) =>
          item._id.equals(current_cart_item.product_id)
        );
        final_result.sub_total += Number(
          Number(current_item[0].qty) * item.actual_price
        );

        return {
          product_id: item._id,
          price: item.actual_price,
          name: item.title,
          total_amt: Number(current_item[0].qty) * item.actual_price,
          qty: current_item[0].qty,
        };
      });

      res.json({
        result: final_result,
        status: true,
        msg: " Your Cart.",
      });
    } catch (except) {
      next({ status: 400, msg: except });
    }
  };
}

module.exports = OrderController;
