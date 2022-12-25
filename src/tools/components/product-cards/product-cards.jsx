import {Component} from "react";
import {connect} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {addProduct} from "../../../redux/product/actions/product-action";
import {allProductsRequest, productsCategoriesRequest} from "../../services/gql-services";
import CategoryList from "../category-list/category-list";

class ProductCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCategory: this.props.pageCategory, data: {}, loading: true
    }
  }

  changeCategory = (category) => (category ? category : null);

  onCategoryButtonClick = (e) => {
    this.setState({category: e.target.textContent});
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, _, snapshot) {
    if(this.props.path !== prevProps.path) {
      this.fetchData();
    }
  }

  fetchData = () => {
    if(this.props.path === "all" || this.props.path=== "") {
      allProductsRequest().then((result) => {
        this.setState({data: result.data})
      }).finally(() => {
        this.setState({loading: false})
      });
    } else {
      productsCategoriesRequest().then((result) => {
        this.setState({data: result.data})
      }).finally(() => {
        this.setState({loading: false})
      })
    }
    // this.props.path === "all" || this.props.path=== "" ? allProductsRequest().then((result) => {
    //   this.setState({data: result.data})
    // }).finally(() => {
    //   this.setState({loading: false})
    // }) : productsCategoriesRequest().then((result) => {
    //   this.setState({data: result.data})
    // }).finally(() => {
    //   this.setState({loading: false})
    // })
  }

  onCartButtonClick = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      id: uuidv4(), name: e.target.id, attributes: [], value: 1,
    });
  };

  render() {
    if (this.state.loading) return <div>Loading...</div>
    const allCategories = this.changeCategory(this.state.data);
    return (<div>
        {allCategories?.category ? (<CategoryList
          key={allCategories.category.name}
          category={allCategories.category}
        />) : (allCategories?.categories?.map((category) => `${category.name}` === this.props.path && (
          <CategoryList key={category.name} category={category}/>)))}
      </div>);
  }
}

const mapStateToProps = (state) => ({
  path: state.products.routes,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (product) => dispatch(addProduct(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCards);
