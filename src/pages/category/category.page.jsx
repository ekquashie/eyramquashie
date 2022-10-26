import React, { Component } from "react";
import ProductCards from "../../tools/components/product-cards/product-cards";
import s from "./category.module.css";

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  render() {
    const path = window.location.href.split('/', 4)[3]

    return (
      <section className={s.wrapper}>
        <ProductCards pageCategory={path} />
      </section>
    );
  }
}
