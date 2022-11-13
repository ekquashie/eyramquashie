import {Component} from "react";
import {v4 as uuidv4} from "uuid";
import s from "./product-attributes.module.css";

class ProductAttributes extends Component {
  state = {
    color: "", size: "", capacity: "", withPorts: "", withTouch: "", attrs: [], loading: false
  };

  loading = false;
  attrs = (e) => {
    this.setState({loading: true})
    const {name, value} = e.target;

    if (name === "Size") {
      this.setState({size: value});
    }
    if (name === "Color") {
      this.setState({color: value});
    }
    if (name === "Capacity") {
      this.setState({capacity: value});
    }
    if (name === "With USB 3 ports") {
      this.setState({withPorts: value});
    }
    if (name === "Touch ID in keyboard") {
      this.setState({withTouch: value});
    }

    setTimeout(() => {
      const {color, size, capacity, withPorts, withTouch} = this.state;

      const onAttributesClick = this.props.onAttributesClick;
      onAttributesClick([capacity, color, size, withPorts, withTouch]);
      this.setState({loading: this.loading})
    }, 100)

  };

  render() {
    const {inStock, attributes} = this.props.product;

    return attributes?.map((attr) => {
      return (<div key={attr.name} className={s.attributes}>
        <h2 className={s.attributesTitle}>{attr.name.toUpperCase()}:</h2>
        <div className={s.attributesList}>
          {attr.items.map((item) => {
            const key = uuidv4();
            return (<div key={item.value} className={s.attributesForm}>
              <input
                onChange={this.attrs}
                className={s.attrButton}
                id={key}
                type="radio"
                name={attr.name}
                value={item.value}
                disabled={!inStock || this.state.loading}
              />
              <label
                className={attr.name === "Color" ? s.coloredLabel : s.attrLabel}
                htmlFor={key}
                style={{
                  backgroundColor: attr.name === "Color" && `${item.displayValue}`,
                }}
              >
                {item.value}
              </label>
            </div>);
          })}
        </div>
      </div>);
    });
  }
}

export default ProductAttributes;
