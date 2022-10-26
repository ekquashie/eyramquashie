import React, { Component } from 'react'
import { connect } from 'react-redux';
import CartItem from '../../tools/components/cart-item/cart-item';
import TotalCounter from '../../tools/components/total-counter/total-counter';
import s from "./cart.module.css"

class Cart extends Component {
  render() {
    const { products, currencies } = this.props;
    return (
      <div className={s.wrapper}>
        <h2 className={s.pageTitle}>CART</h2>
        {products.length ? (
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
            <TotalCounter />
          </ul>
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