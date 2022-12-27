import React, {Component} from "react";
import {Link, NavLink, Outlet} from "react-router-dom";
import {URLS} from "../../../constants/route-links";
import "./page-wrap.css";
import logo from "../../../assets/imgs/logo.jpg";
import NavCartButton from "../navbar/nav-cart-button/nav-cart-button";
import NavCurrencyButton from "../navbar/nav-currency-button/nav-currency-button";
import {categoriesNameRequest} from "../../services/gql-services";
import {connect} from "react-redux";
import {setRoute} from "../../../redux/product/actions/route-action";

class PageWrap extends Component {
  state = {
    showModal: false, categories: [], category: {},
  };

  componentDidMount() {
    if(window.location.pathname === "" || window.location.pathname === "/") {
      this.props.onPathChange("")
    }
    categoriesNameRequest().then((result) => {
      this.setState({categories: result.data.categories, category: result.data.category})
    })
  }

  render() {
    return (<div>
      <nav className="navbar">
        <div className="menu-container">
          {this.state.categories.map((item) => {
            return (<NavLink
              // reloadDocument={false}
              key={item.name}
              to={item.name}
              className={({ isActive }) =>
                isActive ? "active menu-item" : "menu-item"
              }
              onClick={() => this.props.onPathChange(item.name)}
            >
              {item.name}
            </NavLink>);
          })}
        </div>
        <Link to={URLS.home.url}>
          <img src={logo} alt="logo"/>
        </Link>
        <div className="cart-container">
          <NavCurrencyButton/>
          <NavCartButton/>
        </div>
      </nav>
      <main className="main-container">
        <Outlet/>
      </main>
    </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  onPathChange: (path) => dispatch(setRoute(path)),
});

export default connect(null, mapDispatchToProps)(PageWrap);
