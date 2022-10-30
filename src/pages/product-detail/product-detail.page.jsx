import {Component} from "react";
import parse from "html-react-parser";
import {connect} from "react-redux";
import {v4 as uuidv4} from "uuid";
import s from "./product-detail.module.css";
import ProductImages from "../../tools/components/product-images/product-images";
import ProductAttributes from "../../tools/components/product-attrbutes/product-attributes";
import {addProduct} from "../../redux/product/actions/product-action";
import {productRequest} from "../../tools/services/gql-services";

class ProductPage extends Component {
  state = {
    product: {}, productId: "", selectImage: null, isShowMore: false, selectedAttribute: [],
  };

  componentDidMount() {
    const productId = window.location.href.split('/', 5)[4];
    this.setState({productId});
    productRequest(productId).then((response) => {
      this.setState({product: response.data.product});
    })
  }

  onSelectImage = (e) => {
    const image = e.target.src;
    return this.setState({
      selectImage: image,
    });
  };

  onShowMore = () => {
    this.setState((prev) => {
      return {...prev, isShowMore: !prev.isShowMore};
    });
  };

  setActiveAttribute = (attrs) => {
    const filtered = attrs.filter((attr) => attr !== "");
    this.setState({selectedAttribute: [...filtered]});
  };

  onSubmitProduct = (e) => {
    e.preventDefault();
    const {selectedAttribute, productId} = this.state;
    const {onSubmit} = this.props;
    if(this.state.product.attributes.length > 0) {
      if (selectedAttribute.length < 1) {
        alert("No attributes have been selected");
      }
      if (selectedAttribute.length > 0) {
        onSubmit({
          id: uuidv4(), name: productId, attributes: [...selectedAttribute], value: 1,
        });
        this.setState({selectedAttribute: []});
      }
    } else {
      onSubmit({
        id: uuidv4(), name: productId, attributes: [...selectedAttribute], value: 1,
      });
      this.setState({selectedAttribute: []});
    }

  };

  render() {
    const {product, selectImage, isShowMore} = this.state;
    const {currency} = this.props;

    if (this.state.loading) return <p>Loading...</p>;

    return (product && (<div className={s.wrapper}>
      <ProductImages
        product={product}
        selectImage={selectImage}
        onSelectImage={this.onSelectImage}
      />
      <div>
        <h3 className={s.title}>{product.name}</h3>
        <ProductAttributes
          product={product}
          onAttributesClick={this.setActiveAttribute}
        />

        <p className={s.attributesTitle}>PRICE:</p>
        <p className={s.price}>
          {product.prices?.map((cur) => cur.currency.symbol === currency && `${cur.currency.symbol} ${cur.amount}`)}
        </p>
        <button
          type="button"
          onClick={this.onSubmitProduct}
          disabled={!product.inStock && true}
          className={s.submitBtn}
        >
          {!product.inStock ? "OUT OF STOCK" : "ADD TO CART"}
        </button>
        {product.description && (!isShowMore && product.description.length > 300 ? (<div className={s.description}>
          {parse(product.description?.slice(0, 300) + "...")}
        </div>) : (<div className={s.description}>
          {parse(product?.description)}
        </div>))}
        {product.description?.length > 300 && (<button
          className={s.showMoreBtn}
          type="button"
          onClick={() => this.onShowMore()}
        >
          {!isShowMore ? "Show more" : "Hide"}
        </button>)}
      </div>
    </div>));
  }
}

const mapStateToProps = (state) => ({
  currency: state.products.currencies,
});
const mapDispatchToProps = (dispatch) => ({
  onSubmit: (product) => dispatch(addProduct(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
