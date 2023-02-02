import { createSlice } from "@reduxjs/toolkit";

const CartReducer = createSlice({
  name: "cart",
  initialState: {
    detail: null, // cart detail
  },
  reducers: {
    setCart: (state, action) => {
      //   console.log(action.payload, "action payload");
      let cart = JSON.parse(localStorage.getItem("cart")) ?? [];
      const current_prod = action.payload;
      if (cart.length) {
        // not empty
        let index = null;
        cart.forEach((item, ind) => {
          if (item.product_id === current_prod.product_id) {
            index = ind;
          }
        });
        if (index === null) {
          // IT'S A NEW ITEM OF THE CART
          cart.push(current_prod);
        } else {
          // Current product already exist in the cart
          if (current_prod.qty <= 0) {
            cart.splice(index, 1);
          } else {
            cart[index]["qty"] = current_prod.qty;
          }
        }
        console.log(index, "hi iam index");
      } else {
        // empty
        cart.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      state.detail = cart;
    },
    updateCartDetail: (state, action) => {
      let cart = JSON.parse(localStorage.getItem("cart")) ?? [];
      state.detail = cart;
    },

    resetCart: (state, action) => {
      localStorage.removeItem("cart");
      state.detail = null;
    },
  },
});

export const { setCart, updateCartDetail, resetCart } = CartReducer.actions;
export default CartReducer.reducer;
