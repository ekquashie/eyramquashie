import React, {Component} from "react";
import {connect} from "react-redux";
import {
  incrementValue,
  removeProduct,
  decrementValue,
} from "../../../redux/product/actions/product-action";
import s from "./counter.module.css";

class Counter extends Component {
  increment = (e) => {
    const {increment} = this.props;
    if (e.target.id === this.props.id) {
      return increment(1, this.props.id);
    }
  };

  decrement = () => {
    const {decrement} = this.props;
    if (this.props.value === 1) {
      this.props.removeProduct(this.props.id);
    }
    return decrement(1, this.props.id);
  };

  render() {
    const {customClass} = this.props;
    return (
      <div className={s.counter}>
        <button
          id={this.props.id}
          className={customClass ? s[customClass] : s.bigBtn}
          onClick={this.increment}
        >
          +
        </button>
        <span className={this.props.pageSize && s.bigValue}>
          {this.props.value}
        </span>
        <button
          className={customClass ? s[customClass] : s.bigBtn}
          onClick={this.decrement}
        >
          -
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    increment: (value, id) => dispatch(incrementValue({value, id})),
    decrement: (value, id) => dispatch(decrementValue({value, id})),
    removeProduct: (id) => dispatch(removeProduct(id)),
  })
};

export default connect(null, mapDispatchToProps)(Counter);
