import {createReducer, combineReducers, current} from "@reduxjs/toolkit";
import {
  addProduct, removeProduct, editAttribute, incrementValue, decrementValue,
} from "./actions/product-action";
import {changeCurrency} from "./actions/currency-action";

const initialState = {
  products: {
    items: [], currencies: "$",
  },
};

const productReducer = createReducer(initialState.products.items, (builder) => {
  builder.addCase(addProduct, (state, {payload}) => {
    const productIndex = state.findIndex((item) => {
      return item.name === payload.name
    });
    if (state.length !== 0) {
      let currentAttributes = current(state)[0]?.attributes.join(", ");
      let newAttributes = payload.attributes.join(", ");
      if (productIndex > -1 && currentAttributes === newAttributes) {
        const newValue = state[productIndex].value + payload.value
        const arr = [...state]
        arr.splice(productIndex, 1)
        return [...arr, {...payload, value: newValue}]
      } else {
        return [...state, payload]
      }
    } else {
      return [...state, payload]
    }
    // return [...state, payload]
  });
  builder.addCase(editAttribute, (state, {payload}) => {
    const currentState = [...state];
    const productIndex = state.findIndex((item) => {
      return item.id === payload.id;
    })
    if (productIndex > -1) {
      const newItem = {...currentState[productIndex], attributes: payload.attributes}
      currentState.splice(productIndex, 1, newItem);
      return currentState
    }
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
