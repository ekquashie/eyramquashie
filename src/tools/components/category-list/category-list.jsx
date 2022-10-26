import React, { Component } from "react";
import s from "../category-list/category-list.module.css";
import ProductCard from "../product-card/product-card";

export default class CategoryList extends Component {
  render() {
    const category = this.props.category;

    return (
      <div className={s.wrapper}>
        <h2 className={s.title}>{category.name}</h2>
        <ul className={s.list}>
          {category?.products?.map((item) => {
            return (
              <ProductCard
                key={item.id}
                item={item}
                onCartBtnClick={this.onCartBtnClick}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}