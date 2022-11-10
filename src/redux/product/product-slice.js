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
    const productIndex = state.findIndex((item) => { return item.name === payload.name});
    if(productIndex > -1) {
      const newValue = state[productIndex].value + payload.value
      const arr = [...state]
      arr.splice(productIndex, 1)
      return [...arr, {...payload, value: newValue }]
    }
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
