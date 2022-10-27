import { Component } from "react";
import s from "./card-button.module.css";
import addToCartIcon from "../../../assets/imgs/addToCartIcon.png"

export default class CardButton extends Component {
  render() {
    const { item, onButtonClick } = this.props;
    return (
      <button onClick={onButtonClick} className={s.btn} type="submit">
        <img id={item.id} src={addToCartIcon} alt="addToCartIcon" />
      </button>
    );
  }
}
