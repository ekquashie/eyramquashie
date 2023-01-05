import { Component } from "react";
import { Link } from "react-router-dom";
import s from "./modal-buttons.module.css";
import {URLS} from "../../../constants/route-links";

class ModalButtons extends Component {
  render() {
    const { onCloseModal} = this.props;
    return (
      <div className={s.buttons}>
        <Link
          to={URLS.cart.url}
        >
          <button className={s.buttonLink} onClick={onCloseModal}>
            VIEW BAG
          </button>
        </Link>
        <button className={s.button}>CHECK OUT</button>
      </div>
    );
  }
}

export default ModalButtons;
