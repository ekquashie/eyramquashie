import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./product/product-reducer";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;
