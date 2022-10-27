import {createReducer, combineReducers, current} from "@reduxjs/toolkit";
import {
  addProduct, removeProduct, incrementValue, decrementValue,
} from "./actions/product-action";
import {changeCurrency} from "./actions/currency-action";

const initialState = {
  products: {
    items: [], currencies: "$",
  },
};

// const productSlice = createReducer(initialState.products.items, {
//   [addProduct]: (state, { payload }) => {
//     console.log(state)
//     console.log([...state, payload]);
//     return [...state, payload];
//   },
//   [removeProduct]: (state, { payload }) => {
//     return state.filter((product) => product.id !== payload);
//   },
//   [incrementValue]: (state, { payload }) => {
//     return state.map((product) => {
//       return product.id === payload.id
//         ? {
//             ...product,
//             value: product.value + payload.value,
//           }
//         : { ...product };
//     });
//   },
//   [decrementValue]: (state, { payload }) => {
//     return state.map((product) => {
//       return product.id === payload.id
//         ? {
//             ...product,
//             value: product.value - payload.value,
//           }
//         : { ...product };
//     });
//   },
// });

const productSlice = createReducer(initialState.products.items, (builder) => {
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

const currencyReducer = createReducer(initialState.products.currencies, {
  [changeCurrency]: (_, {payload}) => payload,
});

const productsReducer = combineReducers({
  items: productSlice, currencies: currencyReducer,
});

export default productsReducer;
