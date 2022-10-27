import React, {Component} from "react";
import s from "./product-cards.module.css";
import {changeCurrency} from "../../../redux/product/actions/currency-action";
import {addProduct} from "../../../redux/product/actions/product-action";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import CardButton from "../card-button/card-button";
import {v4 as uuidv4} from "uuid";

class ProductCard extends Component {
  onButtonRedirect = (item) => {
    this.props.history.push(`/products/${item.id}`);
  };

  onCartButtonClick = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      id: uuidv4(),
      name: e.target.id,
      attributes: [],
      value: 1,
    });
  };

  render() {
    const {item, currencies, location} = this.props;

    return (
      <li className={s.item}>
        <Link
          className={s.link}
          to={{
            pathname: `/products/${item.id}`,
            state: {from: location},
          }}
        >
          <img className={s.image} src={item?.gallery[0]} alt="name"/>
          {!item?.inStock && <p className={s.imageBlur}>OUT OF STOCK</p>}

          <p className={s.itemName}>{item.name}</p>
          <p className={s.price}>
            {item.prices.map(
              (cur) =>
                cur.currency === currencies && `${cur.currency} ${cur.amount}`
            )}
          </p>
        </Link>
        {item.inStock && (
          <CardButton
            item={item}
            onButtonClick={
              item.attributes.length !== 0
                ? this.onCartButtonClick
                : () => this.onButtonRedirect(item)
            }
          />
        )}
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.products.currencies,
});
const mapDispatchToProps = (dispatch) => ({
  onChangeCurrency: (currency) => dispatch(changeCurrency(currency)),
  onSubmit: (product) => dispatch(addProduct(product)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCard);