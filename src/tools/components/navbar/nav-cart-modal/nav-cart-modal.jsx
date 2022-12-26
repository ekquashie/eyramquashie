import {Component} from "react";
import {createPortal} from "react-dom";
import {connect} from "react-redux";
import s from "./nav-cart-modal.module.css";
import TotalCounter from "../../total-counter/total-counter";
import NavCartItem from "../nav-cart-item/nav-cart-item";
import ModalButtons from "../../modal-buttons/modal.buttons";

const modalRoot = document.querySelector("#modal-root");

class NavCartModal extends Component {
  state = {
    total: 0,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleCloseModal);
  }

  handleCloseModal = (e) => {
    if (e.key === "Escape" || e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const {products, currencies, onCloseModal} = this.props;

    return createPortal(<div className={s.overlay} onClick={this.handleCloseModal}>
      <div
        id="modal" className={s.modal}
        // style={{overflowY: products.length > 3 && "scroll"}}
      >
        <p className={s.title}>
          My Bag,{" "}
          <span
            className={s.totalItems}>{(products.length > 1 || products.length === 0) ? `${products.length} items` : `${products.length} item`}</span>
        </p>
        {products?.map((item, index) => {
          return <NavCartItem
            key={index}
            currencies={currencies}
            item={item}
            index={index}
          />
        })}

        <div className={s.modalOptions}>
          <TotalCounter/>
          <ModalButtons onCloseModal={onCloseModal}/>
        </div>
      </div>
    </div>, modalRoot);
  }
}

const mapStateToProps = (state) => ({
  products: state.products.items, currencies: state.products.currencies,
});

export default connect(mapStateToProps)(NavCartModal);
