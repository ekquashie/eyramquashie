import { createReducer, combineReducers } from "@reduxjs/toolkit";
import {
  addProduct,
  removeProduct,
  incrementValue,
  decrementValue,
} from "./actions/product-action";
import { changeCurrency } from "./actions/currency-action";

const initialState = {
  products: {
    items: [],
    currencies: "$",
  },
};

const ProductReducer = createReducer(initialState.products.items, {
  [addProduct]: (state, { payload }) => {
    return [...state, payload];
  },
  [removeProduct]: (state, { payload }) => {
    return state.filter((product) => product.id !== payload);
  },
  [incrementValue]: (state, { payload }) => {
    return state.map((product) => {
      return product.id === payload.id
        ? {
            ...product,
            value: product.value + payload.value,
          }
        : { ...product };
    });
  },
  [decrementValue]: (state, { payload }) => {
    return state.map((product) => {
      return product.id === payload.id
        ? {
            ...product,
            value: product.value - payload.value,
          }
        : { ...product };
    });
  },
});
const currencyReducer = createReducer(initialState.products.currencies, {
  [changeCurrency]: (_, { payload }) => payload,
});

const productssReducer = combineReducers({
  items: ProductReducer,
  currencies: currencyReducer,
});

export default productssReducer;
