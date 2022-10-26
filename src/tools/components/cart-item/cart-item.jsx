import { Component } from "react";

import s from "./cart-item.module.css";
import { Query } from "@apollo/client";
// import { Carousel } from "react-responsive-carousel";
import Counter from "../counter/counter";
import {productAttributesRequest} from "../../services/gql-services";

export default class CartItem extends Component {
  render() {
    const { item, currencies } = this.props;

    return (
      <li id={item.id} className={s.item}>
        {/*<Query query={productAttributesRequest(item.name)}>*/}
        {/*  {({ loading, error, data }) => {*/}
        {/*    if (loading) return <p>Loading...</p>;*/}
        {/*    if (error) return <p>Error : </p>;*/}
        {/*    const { product } = data;*/}
        {/*    return (*/}
        {/*      product && (*/}
        {/*        <div className={s.miniCard}>*/}
        {/*          <div className={s.leftSide}>*/}
        {/*            <p className={s.itemName}>{product.name}</p>*/}
        {/*            <p className={s.itemPrice}>*/}
        {/*              {product.prices.map(*/}
        {/*                (cur) =>*/}
        {/*                  cur.currency === currencies &&*/}
        {/*                  `${cur.currency} ${*/}
        {/*                    Math.round(cur.amount * item.value * 100) / 100*/}
        {/*                  } `*/}
        {/*              )}*/}
        {/*            </p>*/}
        {/*            <div className={s.attributes}>*/}
        {/*              {item.attributes.map((attr) => {*/}
        {/*                return (*/}
        {/*                  <p*/}
        {/*                    key={attr}*/}
        {/*                    style={{ backgroundColor: attr }}*/}
        {/*                    className={*/}
        {/*                      attr.includes("#") ? s.coloredLabel : s.itemAttrs*/}
        {/*                    }*/}
        {/*                  >*/}
        {/*                    {attr}*/}
        {/*                  </p>*/}
        {/*                );*/}
        {/*              })}*/}
        {/*            </div>*/}
        {/*          </div>*/}

        {/*          <div className={s.rightSide}>*/}
        {/*            <Counter pageSize id={item.id} value={item.value} />*/}
        {/*            /!* <Carousel*/}
        {/*              className={s.carousel}*/}
        {/*              showThumbs={false}*/}
        {/*              showIndicators={false}*/}
        {/*              width={"141px"}*/}
        {/*              centerMode={true}*/}
        {/*              centerSlidePercentage={100}*/}
        {/*              emulateTouch={true}*/}
        {/*              swipeable={true}*/}
        {/*              infiniteLoop={true}*/}
        {/*              showStatus={false}*/}
        {/*              useKeyboardArrows={true}*/}
        {/*            >*/}
        {/*              {product.gallery.map((image) => {*/}
        {/*                return (*/}
        {/*                  <img*/}
        {/*                    key={image}*/}
        {/*                    className={s.itemImage}*/}
        {/*                    src={image}*/}
        {/*                    alt={product.name}*/}
        {/*                  />*/}
        {/*                );*/}
        {/*              })}*/}
        {/*            </Carousel> *!/*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      )*/}
        {/*    );*/}
        {/*  }}*/}
        {/*</Query>*/}
      </li>
    );
  }
}
