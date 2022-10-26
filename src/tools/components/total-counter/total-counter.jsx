import { connect } from "react-redux";
import s from "./total-counter.module.css";
import { Component } from "react";
import { pricesRequest } from "../../services/gql-services";

class TotalCounter extends Component {
  totalCount = (items) => {
    const { products, currency } = this.props;
    const productValue = products.map(({ value }) => value);
    const prices = items.map(({ prices }) => {
      const allprices = prices.filter((price) => {
        return price.currency === currency && price;
      });
      return allprices.reduce((accumulator, price) => {
        return accumulator + price.amount;
      }, 0);
    });
    const total = prices.reduce((acc, item, i) => {
      return acc + item * productValue[i];
    }, 0);
    return total;
  };

  render() {
    const { products, currency } = this.props;
    return (
      <>
        {/* <Query query={pricesRequest()}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error : </p>;
            const productName = products.map((product) => {
              return product.name;
            });
            const items = data.category.products.filter(({ id }) => {
              return productName.includes(id);
            });

            return (
              <p className={s.total}>
                <span>Total</span>
                <span className={s.totalPrice}>
                  {Math.round(this.totalCount(items) * 100) / 100} {currency}
                </span>
              </p>
            );
          }}
        </Query> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.products.currencies,
  products: state.products.items,
});

export default connect(mapStateToProps)(TotalCounter);
