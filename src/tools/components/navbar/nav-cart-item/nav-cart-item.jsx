import {Component} from "react";
import Counter from "../../counter/counter";
import s from "./nav-cart-item.module.css";
import {productAttributesRequest, productRequest} from "../../../services/gql-services";
import ModalProductAttributes from "../../modal-product-attributes/modal-product-attributes";

export default class NavCartItem extends Component {
  state = {
    product: {},
    productId: this.props.item.name,
    productWithAttributes: {},
  }

  async componentDidMount() {
    const product = await productAttributesRequest(this.state.productId).then((result) => {
      return result.data.product
    })
    const productWithAttributes = await productRequest(this.props.item.name).then((result) => {
      return result.data.product
    })
    this.setState({product, productWithAttributes})
  }

  render() {
    const {currencies, item, index} = this.props;
    const {product, productWithAttributes} = this.state;

    if (!product?.name) return <div>Loading...</div>

    return (<div className={s.miniCard}>
      <div className={s.leftSide}>
        <p className={s.itemName}>{product.name}</p>
        <p className={s.itemBrand}>{productWithAttributes.brand}</p>
        <p className={s.itemPrice}>
          {product?.prices.map(
            (price) =>
              price.currency.symbol === currencies &&
              `${price.currency.symbol} ${
                Math.round(price.amount * item.value * 100) / 100
              } `
          )}
        </p>
        <div className={s.attributes}>
          <ModalProductAttributes
            product={{...productWithAttributes, selectedAttribute: item.attributes}}
            onAttributesClick={() => console.log('Hi')}
            index={index}
          />
        </div>
      </div>

      <div className={s.rightSide}>
        <Counter id={item.id} customClass={'btn'} value={item.value}/>
        <img
          className={s.itemImage}
          src={product?.gallery[0]}
          alt={product?.name}
        />
      </div>
    </div>);
  }
}