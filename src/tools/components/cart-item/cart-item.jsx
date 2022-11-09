import {Component} from "react";
import s from "./cart-item.module.css";
import { Carousel } from "react-responsive-carousel";
import Counter from "../counter/counter";
import {productAttributesRequest} from "../../services/gql-services";

export default class CartItem extends Component {
  state = {
    product: {},
  }

  async componentDidMount() {
    const product = await productAttributesRequest(this.props.item.name).then((result) => {
      return result.data.product
    })
    this.setState({product: product})
  }

  render() {
    const {item, currencies} = this.props;
    const {product} = this.state;

    return (
      <li id={item.id} className={s.item}>
        {product.name && (
          <div className={s.miniCard}>
            <div className={s.leftSide}>
              <p className={s.itemName}>{product.name}</p>
              <p className={s.itemPrice}>
                {product?.prices.map(
                  (price) =>
                    price.currency.symbol === currencies &&
                    `${price.currency.symbol} ${
                      Math.round(price.amount * item.value * 100) / 100
                    } `
                )}
              </p>
              <div className={s.attributes}>
                {item.attributes.map((attr) => {
                  return (
                    <p
                      key={attr}
                      style={{backgroundColor: attr}}
                      className={
                        attr.includes("#") ? s.coloredLabel : s.itemAttrs
                      }
                    >
                      {attr}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className={s.rightSide}>
              <Counter pageSize id={item.id} value={item.value}/>
              {/*<Carousel*/}
              {/*  className={s.carousel}*/}
              {/*  showThumbs={false}*/}
              {/*  showIndicators={false}*/}
              {/*  width={"141px"}*/}
              {/*  centerMode={true}*/}
              {/*  centerSlidePercentage={100}*/}
              {/*  emulateTouch={true}*/}
              {/*  swipeable={true}*/}
              {/*  infiniteLoop={true}*/}
              {/*  showStatus={false}*/}
              {/*  useKeyboardArrows={true}*/}
              {/*>*/}
              {/*  {product?.gallery?.map((image, index) => {*/}
              {/*    return (*/}
              {/*      <div key={index}>*/}
                      <img
                        className={s.itemImage}
                        src={product?.gallery[0]}
                        alt={product?.name}
                      />
                    {/*</div>*/}
              {/*    );*/}
              {/*  })}*/}
              {/*</Carousel>*/}
            </div>
          </div>
        )}
      </li>
    );
  }
}
