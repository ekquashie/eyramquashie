import React, {Component} from "react";
import s from "./product-cards.module.css";
import {changeCurrency} from "../../../redux/product/actions/currency-action";
import {addProduct} from "../../../redux/product/actions/product-action";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import CardButton from "../card-button/card-button";
import {v4 as uuidv4} from "uuid";
import {withRouter} from "../../libraries/withRouter";

class ProductCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
    }
  }

  onButtonRedirect = (item) => {
    this.props.navigate(`/products/${item.id}`);
  };

  onCartButtonClick = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      id: uuidv4(), name: e.target.id, attributes: [], value: 1,
    });
  };

  render() {
    const {item, currencies} = this.props;
    const {hovered} = this.state;

    return (<li className={s.item} onMouseLeave={() => this.setState({hovered: false})} onMouseEnter={() => this.setState({hovered: true})}>
        <Link
          className={s.link}
          to={{
            pathname: `/products/${item.id}`,
          }}
        >
          <img className={s.image} src={item?.gallery[0]} alt="name"/>
          {!item?.inStock && <p className={s.imageBlur}>OUT OF STOCK</p>}

          <p className={s.itemName}>{item.name}</p>
          <p className={s.price}>
            {item.prices.map((cur) => cur.currency === currencies && `${cur.currency} ${cur.amount}`)}
          </p>
        </Link>
        {item.inStock && hovered && (<CardButton
            item={item}
            onButtonClick={item.attributes.length === 0 ? this.onCartButtonClick : () => this.onButtonRedirect(item)}
          />)}
      </li>);
  }
}

const mapStateToProps = (state) => ({
  currencies: state.products.currencies,
});
const mapDispatchToProps = (dispatch) => ({
  onChangeCurrency: (currency) => dispatch(changeCurrency(currency)),
  onSubmit: (product) => dispatch(addProduct(product)),
});

//withRouter not working in react-router v6
//Had to create a custom withRouter components since hooks cannot be used in class based components
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductCard));