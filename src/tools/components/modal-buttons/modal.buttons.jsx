import { Component } from "react";
import { Link } from "react-router-dom";
import s from "./modal-buttons.module.css";

class ModalButtons extends Component {
  render() {
    const { onCloseModal, location} = this.props;
    return (
      <div className={s.buttons}>
        <Link
          to={{
            pathname: "/cart",
            state: { from: location },
          }}
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
