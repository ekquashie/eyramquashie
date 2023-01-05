import React, {Component} from "react";
import {v4 as uuidv4} from "uuid";
import s from "./modal-product-attributes.module.css";
import {connect} from "react-redux";
import {editAttribute} from "../../../redux/product/actions/product-action";
import {removeSpace} from "../../libraries/easy";

class ModalProductAttributes extends Component {
  state = {
    selectedAttributes: this.props.selectedAttributes
  };

  render() {
    const {name, attributes} = this.props.product;
    const {selectedAttributes} = this.state;

    return (<div>{attributes?.map((attr, index) => {
      return (<div key={attr.name + name + "modal" + index} className={s.attributes}>
        <h2 className={s.attributesTitle}>{attr.name.toUpperCase()}:</h2>
        <div className={s.attributesList}>
          {attr.items.map((item) => {
            let checked = false;
            for (let key in selectedAttributes) {
              if (key === removeSpace(attr.name).toLowerCase() && item.value === selectedAttributes[key]) {
                checked = true;
              }
            }
            const key = uuidv4();
            return (<div key={item.value} className={s.attributesForm}>
              <input
                onChange={() => null}
                className={s.attrButton}
                id={key}
                checked={checked}
                type="radio"
                name={attr.name + name + "modal" + this.props.index}
                value={item.value}
                disabled={this.state.loading}
              />
              <label
                className={attr.name === "Color" ? s.coloredLabel : s.attrLabel}
                htmlFor={key}
                style={{
                  backgroundColor: attr.name === "Color" ? `${item.value}` : false,
                }}
              >
                {item.value}
              </label>
            </div>);
          })}
        </div>
      </div>);
    })}</div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (product) => dispatch(editAttribute(product)),
});

export default connect(null, mapDispatchToProps)(ModalProductAttributes);