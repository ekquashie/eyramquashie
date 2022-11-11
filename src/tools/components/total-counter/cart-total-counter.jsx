import {connect} from "react-redux";
import s from "./cart-total-counter.module.css";
import {Component} from "react";
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

  cartTotalCount = (items) => {
    const {products, currency} = this.props;
    if(!products)
      return <div>Loading...</div>

    const productValue = products.map(({value}) => value);
    if(items.length > 0) {
      const prices = items?.map(({prices}) => {
        const allPrices = prices?.filter((price) => {
          return price.currency.symbol === currency && price;
        });
        return allPrices?.reduce((acc, price) => {
          return acc + price.amount;
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
      <p style={{marginTop: "40px", borderTop: "1px solid #e5e5e5"}} className={s.cartTotalQuantity}>
        <span>Tax 21%:</span>
        <span className={s.cartTotalPrice}>
          {currency}{((Math.round(this.cartTotalCount(arr) * 100) / 100 || 0) * 0.21).toFixed(2)}
        </span>
      </p>
      <p className={s.cartTotalQuantity}>
        <span>Quantity:</span>
        <span className={s.cartTotalPrice}>
          {products?.reduce((acc, item) => {
            console.log(item)
            return acc + item.value;
          }, 0)}
        </span>
      </p>
      <p className={s.cartTotal}>
        <span>Total:</span>
        <span className={s.cartTotalPrice}>
          {currency}{Math.round(this.cartTotalCount(arr) * 100) / 100 || 0}
        </span>
      </p>
    </>);
  }
}

const mapStateToProps = (state) => ({
  currency: state.products.currencies, products: state.products.items,
});

export default connect(mapStateToProps)(TotalCounter);
