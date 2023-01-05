import React, {Component} from "react";
import s from "./product-cards.module.css";
import {changeCurrency} from "../../../redux/product/actions/currency-action";
import {addProduct} from "../../../redux/product/actions/product-action";
import {connect} from "react-redux";
import {Link, Navigate} from "react-router-dom";
import CardButton from "../card-button/card-button";
import {v4 as uuidv4} from "uuid";

class ProductCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hovered: false, route: false, productUrl: "",
    }
  }

  onButtonRedirect = (item) => {
    this.setState({route: true, productUrl: `/products/${item.id}`})
  };

  onCartButtonClick = (e) => {
    const {onSubmit} = this.props;
    e.preventDefault();
    onSubmit({
      id: uuidv4(), name: e.target.id, attributes: [], value: 1,
    });
  };

  render() {
    const {item, currency} = this.props;
    const {hovered, route, productUrl} = this.state;
    const {inStock} = item;

    return (<li className={s.item} onMouseLeave={() => this.setState({hovered: false})}
                onMouseEnter={() => this.setState({hovered: true})}>
      {route && <Navigate to={productUrl} replace={true}/>}
      <Link
        className={s.link}
        to={{
          pathname: `/products/${item.id}`,
        }}
      >
        <img className={s.image} src={item?.gallery[0]} alt="name"/>
        {!inStock && <p className={s.imageBlur}>OUT OF STOCK</p>}

        <p className={s.itemName}>{item.name}</p>
        <p className={s.price}>
          {item.prices.map((cur) => cur.currency.symbol === currency && `${cur.currency.symbol} ${cur.amount}`)}
        </p>
      </Link>
      {inStock && hovered && (<CardButton
        item={item}
        onButtonClick={item.attributes.length === 0 ? this.onCartButtonClick : () => this.onButtonRedirect(item)}
      />)}
    </li>);
  }
}

const mapStateToProps = (state) => ({
  currency: state.products.currencies,
});
const mapDispatchToProps = (dispatch) => {
  return ({
    onChangeCurrency: (currency) => dispatch(changeCurrency(currency)),
    onSubmit: (product) => dispatch(addProduct(product)),
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);