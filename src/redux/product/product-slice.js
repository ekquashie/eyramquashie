import {createReducer, combineReducers} from "@reduxjs/toolkit";
import {
  addProduct, removeProduct, incrementValue, decrementValue,
} from "./actions/product-action";
import {changeCurrency} from "./actions/currency-action";

const initialState = {
  products: {
    items: [], currencies: "$",
  },
};

const productReducer = createReducer(initialState.products.items, (builder) => {
  builder.addCase(addProduct, (state, {payload}) => {
    return [...state, payload]
  });
  builder.addCase(removeProduct, (state, {payload}) => {
    return state.filter((product) => product.id !== payload);
  });
  builder.addCase(incrementValue, (state, {payload}) => {
    return state.map((product) => {
      return product.id === payload.id ? {
        ...product, value: product.value + payload.value,
      } : {...product};
    });
  });
  builder.addCase(decrementValue, (state, {payload}) => {
    return state.map((product) => {
      return product.id === payload.id ? {
        ...product, value: product.value - payload.value,
      } : {...product};
    });
  });
});

const currencyReducer = createReducer(initialState.products.currencies, (builder) => {
  builder.addCase(changeCurrency, (_, {payload}) => payload);
});

const productsReducer = combineReducers({
  items: productReducer, currencies: currencyReducer,
});

export default productsReducer;
