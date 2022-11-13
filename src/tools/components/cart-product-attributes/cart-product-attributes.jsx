import {Component} from "react";
import {v4 as uuidv4} from "uuid";
import s from "../product-attrbutes/product-attributes.module.css";

class CartProductAttributes extends Component {
  state = {
    color: "", size: "", capacity: "", withPorts: "", withTouch: "", attrs: [], loading: false, selectedAttributes: this.props.selectedAttributes
  };

  loading = false;
  attrs = (e) => {
    const {value} = e.target;
    const inputIndex = e.target.dataset.index
    let newAttributes = [...this.state.selectedAttributes]
    newAttributes[inputIndex] = value;
    this.setState({selectedAttributes: newAttributes})
  };

  render() {
    const {name, attributes} = this.props.product;
    const {selectedAttributes} = this.state;

    return (<div>{attributes?.map((attr, index) => {
      return (<div key={attr.name} className={s.attributes}>
        <h2 className={s.attributesTitle}>{attr.name.toUpperCase()}:</h2>
        <div className={s.attributesList}>
          {attr.items.map((item) => {
            const key = uuidv4()
            return (<div key={item.value} className={s.attributesForm}>
              <input
                onChange={this.attrs}
                className={s.attrButton}
                id={key}
                data-index={index}
                checked={selectedAttributes.includes(item.value)}
                type="radio"
                name={attr.name + name + this.props.index}
                value={item.value}
                disabled={this.state.loading}
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

export default CartProductAttributes;
