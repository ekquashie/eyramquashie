import {createReducer, combineReducers, current} from "@reduxjs/toolkit";
import {
  addProduct, removeProduct, editAttribute, incrementValue, decrementValue,
} from "./actions/product-action";
import {changeCurrency} from "./actions/currency-action";
import {setRoute} from "./actions/route-action";

const initialState = {
  products: {
    items: [], currencies: "$", routes: "all",
  }
};

const productReducer = createReducer(initialState.products.items, (builder) => {
  builder.addCase(addProduct, (state, {payload}) => {
    //get index of existing product in cart
    const productIndex = state.findIndex((item) => {
      return item.name === payload.name
    });
    if (state.length !== 0) {
      // let currentAttributes = current(state)[0]?.attributes.join(", ");
      // let newAttributes = payload.attributes.join(", ");
      // if (productIndex > -1 && currentAttributes === newAttributes) {
      //   const newValue = state[productIndex].value + payload.value
      //   const arr = [...state]
      //   arr.splice(productIndex, 1)
      //   return [...arr, {...payload, value: newValue}]
      // } else {
      //   return [...state, payload]
      // }
      if(productIndex > -1) {
        //* get attributes of matching product in cart
        const currentAttributes = state[productIndex].attributes;
        //* get attributes of product to be added to cart
        const newAttributes = payload.attributes;
        //* loop through product in cart attribute and compare both attributes
        // for (const key in currentAttributes) {
        //   if (currentAttributes.hasOwnProperty(key)) {
        //     if (!newAttributes.hasOwnProperty(key) || currentAttributes[key] !== newAttributes[key]) {
        //       //set isMatch to false if they do not have the same key-value pairs
        //       isMatch = false
        //       break;
        //     }
        //   }
        // }
        if (JSON.stringify(currentAttributes) === JSON.stringify(newAttributes)) {
          //* update quantity of product if key-value pairs of both attributes match
          const newValue = current(state)[productIndex].value + 1;
          const cartState = [...current(state)];
          cartState.splice(productIndex, 1)
          return [...cartState, {...payload, value: newValue}]
        } else {
          //* add product to cart if key-value pairs of attributes don't match
          return [...state, payload]
        }
      } else {
        return [...state, payload]
      }
    } else {
      return [...state, payload]
    }
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

const routeReducer = createReducer(initialState.products.routes, (builder) => {
  builder.addCase(setRoute, (_, {payload}) => payload);
});

const productsReducer = combineReducers({
  items: productReducer, currencies: currencyReducer, routes: routeReducer
});

export default productsReducer;