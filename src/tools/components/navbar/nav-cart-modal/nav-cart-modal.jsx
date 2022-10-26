import {Component} from "react";
import {createPortal} from "react-dom";
import {connect} from "react-redux";
import {v4 as uuidv4} from "uuid";
import s from "./nav-cart-modal.module.css";
import TotalCounter from "../../total-counter/total-counter";
// import { productAttributesRequest } from "../../services/gql-requests";
import NavCartItem from "../nav-cart-item/nav-cart-item";
import ModalButtons from "../../modal-buttons/modal.buttons";
import {productAttributesRequest} from "../../../services/gql-services";

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

  getProductsAttributes = (item) => {
    return productAttributesRequest(item).then((response) => {
      return response.data.product;
    });
  }

  render() {
    const {products, currencies, onCloseModal} = this.props;

    return createPortal(<div className={s.Overlay} onClick={this.handleCloseModal}>
      <div
        className={s.Modal}
        style={{overflowY: products.length > 3 && "scroll"}}
      >
        <p className={s.title}>
          My Bag,{" "}
          <span className={s.totalItems}>{products.length} items</span>
        </p>
        {products.map((item) => {
          const product = this.getProductsAttributes(item.name);
          return <NavCartItem
            product={product}
            currencies={currencies}
            item={item}
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
