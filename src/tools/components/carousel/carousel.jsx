import React, {Component} from 'react';
import s from "../cart-item/cart-item.module.css";
import {SlArrowLeft, SlArrowRight} from "react-icons/sl";

class Carousel extends Component {
  state = {
    slideIndex: 0,
  }

  incrementIndex = () => {
    return this.setState({slideIndex: this.state.slideIndex > this.props.product?.gallery?.length - 2 ? 0 : this.state.slideIndex + 1})
  };

  decrementIndex = () => {
    return this.setState({slideIndex: this.state.slideIndex === 0 ? this.props.product?.gallery?.length - 1 : this.state.slideIndex - 1})
  };

  render() {
    const {slideIndex} = this.state;
    const {product} = this.props;
    return (
      <div className={s.carouselContainer}>
        {product?.gallery?.map((image, index) => {
          return <img
            key={image}
            className={index === slideIndex ? s.itemImage : s.itemImageHidden}
            src={product?.gallery[index]}
            alt={product.name}
          />
        })}
        <div className={s.carouselButtonContainer}>
          <button className={s.carouselButton} onClick={this.decrementIndex}><SlArrowLeft /></button>
          <button className={s.carouselButton} onClick={this.incrementIndex}><SlArrowRight /></button>
        </div>
      </div>
    );
  }
}

export default Carousel;
