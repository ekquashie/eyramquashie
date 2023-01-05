import { Component } from "react";
import s from "./product-images.module.css";

class ProductImages extends Component {
  render() {
    const { product, selectImage, onSelectImage } = this.props;
    return (
      <div className={s.imagesSection}>
        <ul className={s.imagesList}>
          {product &&
            product.gallery?.map((image) => {
              return (
                <li
                  onClick={onSelectImage}
                  key={image}
                  className={s.imagesListItem}
                >
                  <img className={s.selectImage} src={image} alt={image} />
                </li>
              );
            })}
        </ul>
        <img
          className={s.selectedImage}
          src={!selectImage && product.gallery ? product.gallery[0] : selectImage}
          alt={!selectImage && product.gallery ? product.gallery[0] : selectImage}
        />
      </div>
    );
  }
}

export default ProductImages;
