import React, {Component} from "react";
import ProductCards from "../../tools/components/product-cards/product-cards";
import s from "./category.module.css";
import {connect} from "react-redux";
import {setRoute} from "../../redux/product/actions/route-action";
import {categoriesNameRequest} from "../../tools/services/gql-services";
import {capitalizeFirstLetter} from "../../tools/libraries/easy";
import {Link} from "react-router-dom";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false, categories: [],
    }
  }

  componentDidMount() {
    const {onPathChange} = this.props;
    if (window.location.pathname === "" || window.location.pathname === "/") {
      onPathChange("");
    }

    categoriesNameRequest().then((result) => {
      this.setState({categories: result.data.categories})
    })
  }


  render() {
    const {categories} = this.state;
    const {path, onPathChange} = this.props;
    return (
      <>
        {path !== "" && path !== "all" ? (<section className={s.wrapper}>
            <ProductCards/>
          </section>) :
          (
            <div className={s.cardContainer}>
              {categories.length > 0 && categories.filter((category) => {
                return category.name !== "all"
              }).map((category, index) => {
                return <Link
                  to={category.name}
                  key={index}
                  className={s.categoryCard}
                  onClick={() => onPathChange(category.name)}>
                  {capitalizeFirstLetter(category.name)}
                </Link>
              })}
            </div>
          )
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  path: state.products.routes,
});

const mapDispatchToProps = (dispatch) => {
  return ({
    onPathChange: (path) => dispatch(setRoute(path)),
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Category)