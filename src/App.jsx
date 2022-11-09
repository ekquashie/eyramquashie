import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { URLS } from "./constants/route-links";
import Cart from "./pages/cart/cart.page";
import Category from "./pages/category/category.page";
import ProductDetail from "./pages/product-detail/product-detail.page";
import PageWrap from "./tools/components/page-wrap/page-wrap";

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path={URLS.home.route} element={<PageWrap />}>
          <Route
            path="/"
            element={<Category />}
          />
          <Route
            path="/:category"
            element={<Category />}
          />
          <Route
            path={`${URLS.productDetail.route}/:productId`}
            element={<ProductDetail />}
          />
          <Route path={URLS.cart.route} element={<Cart />} />
        </Route>
      </Routes>
    );
  }
}

export default App;
