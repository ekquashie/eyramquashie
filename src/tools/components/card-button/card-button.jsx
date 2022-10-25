import { Component } from "react";
import s from "./card-button.module.css";
import addToCartIcon from "../../../assets/imgs/addToCartIcon.png"

export default class CardButton extends Component {
  render() {
    const { item, onBtnClick } = this.props;
    return (
      <button onClick={onBtnClick} className={s.btn} type="submit">
        <img id={item.id} src={addToCartIcon} alt="addToCartIcon" />
      </button>
    );
  }
}
