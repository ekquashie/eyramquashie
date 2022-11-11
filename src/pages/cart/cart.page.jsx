import React, {Component} from 'react'
import {connect} from 'react-redux';
import CartItem from '../../tools/components/cart-item/cart-item';
import s from "./cart.module.css"
import CartTotalCounter from "../../tools/components/total-counter/cart-total-counter";

class Cart extends Component {
  render() {
    const {products, currencies} = this.props;
    return (
      <div className={s.wrapper}>
        <h2 className={s.pageTitle}>CART</h2>
        {products.length ? (
          <>
            <ul className={s.list}>
              {products.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    item={item}
                    currencies={currencies}
                  />
                );
              })}
            </ul>
            <div className={s.totalContainer}>
              <CartTotalCounter />
              <button className={s.orderButton}>ORDER</button>
            </div>
          </>
        ) : (
          <p className={s.emptyMessage}>Your cart is empty.</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.items,
  currencies: state.products.currencies,
});

export default connect(mapStateToProps)(Cart);