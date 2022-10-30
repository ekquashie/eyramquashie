import {Component} from "react";
import Counter from "../../counter/counter";
import s from "./nav-cart-item.module.css";

export default class NavCartItem extends Component {
  state = {
    product: {},
  }

  async componentDidMount() {
    const prod = await this.props.product.then(r => r)
    this.setState({product: prod})
  }

  render() {
    const {currencies, item} = this.props;
    const {product} = this.state;

    if (!product?.name) return <div>Loading...</div>

    return (<div className={s.miniCard}>
        <div className={s.leftSide}>
          <p className={s.itemName}>{product.name}</p>
          <p className={s.itemPrice}>
            {product?.prices?.map((cur) => cur.currency === currencies && `${cur.currency} ${Math.round(cur.amount * item.value * 100) / 100}`)}
          </p>
          <div className={s.attributes}>
            {item.attributes.map((attr) => (<p
                key={attr}
                style={{
                  backgroundColor: attr, fontSize: attr.length > 5 && 0,
                }}
                className={s.itemAttrs}
              >
                {attr}
              </p>))}
          </div>
        </div>

        <div className={s.rightSide}>
          <Counter id={item.id} value={item.value}/>
          <img
            className={s.itemImage}
            src={product?.gallery[0]}
            alt={product.name}
          />
        </div>
      </div>);
  }
}