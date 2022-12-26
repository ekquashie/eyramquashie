import {Component} from "react";
import {v4 as uuidv4} from "uuid";
import s from "../product-attrbutes/product-attributes.module.css";
import {editAttribute} from "../../../redux/product/actions/product-action";
import {connect} from "react-redux";
import {removeSpace} from "../../libraries/easy";

class CartProductAttributes extends Component {
  state = {
    loading: false,
    selectedAttributes: this.props.selectedAttributes
  };

  loading = false;
  attrs = (e) => {
    const {dataset: {item, attribute}} = e.target;
    const {onSubmit} = this.props;
    let newAttributes = {...this.state.selectedAttributes}
    for(let key in newAttributes) {
      if(key === removeSpace(attribute).toLowerCase()) {
        newAttributes[key] = item
      }
    }
    this.setState({selectedAttributes: newAttributes})
    onSubmit({
      id: this.props.id, attributes: {...newAttributes}
    });
  };

  render() {
    const {name, attributes} = this.props.product;
    const {selectedAttributes} = this.state;

    return (<div>{attributes?.map((attr) => {
      return (<div key={attr.name} className={s.attributes}>
        <h2 className={s.attributesTitle}>{attr.name.toUpperCase()}:</h2>
        <div className={s.attributesList}>
          {attr.items.map((item) => {
            let checked = false;
            for (let key in selectedAttributes) {
              if (key === removeSpace(attr.name).toLowerCase() && item.value === selectedAttributes[key]) {
                checked = true;
              }
            }
            const key = uuidv4()
            return (<div key={item.value} className={s.attributesForm}>
              <input
                onChange={this.attrs}
                className={s.attrButton}
                id={key}
                data-item={item.value}
                data-attribute={attr.name}
                checked={checked}
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

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (product) => dispatch(editAttribute(product)),
});

export default connect(null, mapDispatchToProps)(CartProductAttributes);
