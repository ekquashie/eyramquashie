import {connect} from "react-redux";
import s from "./total-counter.module.css";
import React, {Component} from "react";
import {pricesRequest} from "../../services/gql-services";

class TotalCounter extends Component {
  state = {
    prices: [],
  }

  componentDidMount() {
    pricesRequest().then((response) => {
      this.setState({prices: response.data.category.products})
    })
  }

  totalCount = (items) => {
    const {products, currency} = this.props;
    if(!products)
      return <div>Loading...</div>

    const productValue = products.map(({value}) => value);
    if(items.length > 0) {
      const prices = items?.map(({prices}) => {
        const allPrices = prices?.filter((price) => {
          return price.currency.symbol === currency && price;
        });
        return allPrices?.reduce((accumulator, price) => {
          return accumulator + price.amount;
        }, 0);
      });
      return prices?.reduce((acc, item, i) => {
        return acc + item * productValue[i];
      }, 0);
    }
  };

  render() {
    const {products, currency} = this.props;
    const {prices} = this.state;
    let items = [];
    let arr = []
    return (<>
      {/* eslint-disable-next-line array-callback-return */}
      {products.map((product) => {
        if(prices[0]) {
          items = prices?.filter(({id}) => {
            return product.name.includes(id);
          });
          arr.push(items[0])
        }
      })}
      <p className={s.total}>
        <span>Total:</span>
        <span className={s.totalPrice}>
          {currency}{Math.round(this.totalCount(arr) * 100) / 100 || 0}
        </span>
      </p>
    </>);
  }
}

const mapStateToProps = (state) => ({
  currency: state.products.currencies, products: state.products.items,
});

export default connect(mapStateToProps)(TotalCounter);
