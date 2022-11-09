import React, {Component} from "react";
import {Link, NavLink, Outlet} from "react-router-dom";
import {URLS} from "../../../constants/route-links";
import "./page-wrap.css";
import logo from "../../../assets/imgs/logo.jpg";
import NavCartButton from "../navbar/nav-cart-button/nav-cart-button";
import NavCurrencyButton from "../navbar/nav-currency-button/nav-currency-button";
import {categoriesNameRequest} from "../../services/gql-services";

export class PageWrap extends Component {
  state = {
    showModal: false, categories: [], category: {},
  };

  // onCartClick = () => {
  //   this.setState((prevState) => {
  //     return {showModal: !prevState.showModal};
  //   });
  // };

  // onModalClose = () => {
  //   this.setState({
  //     showModal: false,
  //   });
  // };

  componentDidMount() {
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
              key={item.name}
              to={item.name}
              className="menu-item"
              style={({ isActive }) =>
              isActive ? {
                color: "#5ece7b",
                transform: "scaleX(1)"
              } : undefined
            }

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

export default PageWrap;
