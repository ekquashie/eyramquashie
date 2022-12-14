import React, {Component} from "react";
import s from "./cart-item.module.css";
import Counter from "../counter/counter";
import {productAttributesRequest, productRequest} from "../../services/gql-services";
import Carousel from "../carousel/carousel";
import CartProductAttributes from "../cart-product-attributes/cart-product-attributes";

export default class CartItem extends Component {
  state = {
    product: {},
    productWithAttributes: {},
  }

  async componentDidMount() {
    const product = await productAttributesRequest(this.props.item.name).then((result) => {
      return result.data.product
    })
    const productWithAttributes = await productRequest(this.props.item.name).then((result) => {
      return result.data.product
    })
    this.setState({product, productWithAttributes})
  }

  render() {
    const {item, currency, index} = this.props;
    const {product: {name, gallery, prices}, productWithAttributes} = this.state;

    return (
      <li id={item.id} className={s.item}>
        {name && (
          <div className={s.miniCard}>
            <div className={s.leftSide}>
              <p className={s.itemName}>{name}</p>
              <p className={s.itemBrand}>{productWithAttributes.brand}</p>
              <p className={s.itemPrice}>
                {prices.map(
                  (price) =>
                    price.currency.symbol === currency &&
                    `${price.currency.symbol} ${
                      price.amount
                    } `
                )}
              </p>
              <div>
                <CartProductAttributes
                  product={productWithAttributes}
                  selectedAttributes={item.attributes}
                  index={index}
                  id={item.id}
                />
              </div>
            </div>
            <div className={s.rightSide}>
              <Counter pageSize id={item.id} value={item.value}/>
              {gallery && gallery?.length > 1 ? <Carousel gallery={gallery}/> : <img
                className={s.itemImage}
                src={gallery[0]}
                alt={name}
              />}
            </div>
          </div>
        )}
      </li>
    );
  }
}