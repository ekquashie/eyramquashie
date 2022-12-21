import {Component} from "react";
import {v4 as uuidv4} from "uuid";
import s from "./modal-product-attributes.module.css";
import {connect} from "react-redux";
import {editAttribute} from "../../../redux/product/actions/product-action";

class ModalProductAttributes extends Component {
  state = {
    color: "", size: "", capacity: "", withPorts: "", withTouch: "", attrs: [], loading: false, selectedAttributes: this.props.selectedAttributes
  };

  loading = false;
  // attrs = (e) => {
  //   const {value} = e.target;
  //   const {onSubmit} = this.props;
  //   const inputIndex = e.target.dataset.index
  //   let newAttributes = [...this.state.selectedAttributes]
  //   newAttributes[inputIndex] = value;
  //   this.setState({selectedAttributes: newAttributes})
  //   onSubmit({
  //     id: this.props.id, attributes: [...newAttributes]
  //   });
  // };

  render() {
    const {name, inStock, attributes} = this.props.product;
    const {selectedAttributes} = this.state;

    return (<div>{attributes?.map((attr, index) => {
      return (<div key={attr.name + name + "modal" + index} className={s.attributes}>
        <h2 className={s.attributesTitle}>{attr.name.toUpperCase()}:</h2>
        <div className={s.attributesList}>
          {attr.items.map((item) => {
            const key = uuidv4();
            return (<div key={item.value} className={s.attributesForm}>
              <input
                onChange={() => null}
                className={s.attrButton}
                id={key}
                data-index={index}
                checked={selectedAttributes.includes(item.value)}
                type="radio"
                name={attr.name + name + "modal" + this.props.index}
                value={item.value}
                disabled={!inStock || this.state.loading}
              />
              <label
                className={attr.name === "Color" ? s.coloredLabel : s.attrLabel}
                htmlFor={key}
                style={{
                  backgroundColor: attr.name === "Color" && `${item.value}`,
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