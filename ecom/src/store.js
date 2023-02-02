import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/user.slicer";
import cartReducers from "./reducers/cart.reducers";

const rootStore = configureStore({
  reducer: {
    user: UserReducer,
    cart: cartReducers,
  },
});

export default rootStore;
