import React, {Component} from 'react';
import s from "../cart-item/cart-item.module.css";
import {SlArrowLeft, SlArrowRight} from "react-icons/sl";

class Carousel extends Component {
  state = {
    slideIndex: 0,
  }

  incrementIndex = () => {
    return this.setState({slideIndex: this.state.slideIndex > this.props.gallery?.length - 2 ? 0 : this.state.slideIndex + 1})
  };

  decrementIndex = () => {
    return this.setState({slideIndex: this.state.slideIndex === 0 ? this.props.gallery?.length - 1 : this.state.slideIndex - 1})
  };

  render() {
    const {slideIndex} = this.state;
    const {gallery} = this.props;
    return (
      <div className={s.carouselContainer}>
        {gallery?.map((image, index) => {
          return <img
            key={image}
            className={index === slideIndex ? s.itemImage : s.itemImageHidden}
            src={gallery[index]}
            alt={image}
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
