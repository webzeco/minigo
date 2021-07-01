import { useContext, useEffect, useState } from "react";
import { ProductDetailContext } from "../contexts/ProductDetailContext";
import "./style/productCard.css";
const ProductCard = ({ images, title, price, colorImg, product }) => {
  const { productDetailHandler } = useContext(ProductDetailContext);
  const [image, setImage] = useState(images[0]);
  useEffect(() => {
    console.log(image);
  }, [image]);

  const changeImgEnter = () => {
    if (images.length > 1) {
      setImage(images[1]);
    }
  };
  const changeImgLeave = () => {
    if (images.length > 1) {
      setImage(images[0]);
    }
  };
  const onradioBtnChange = (e) => {
    console.log(e.target.value);
    setImage(e.target.value);
  };
  const onClicked = (prod) => {
    productDetailHandler(prod);
  };

  return (
    <div
      onClick={() => onClicked(product)}
      class="col-lg-3 col-md-4 col-sm-6 pb-3 pb-3 bg-gray-200"
    >
      <div class="card">
        <div
          class="bg-image hover-overlay ripple"
          data-mdb-ripple-color="light"
        >
          <img
            alt="item img"
            src={image}
            onMouseEnter={() => changeImgEnter()}
            onMouseLeave={() => {
              changeImgLeave();
            }}
            class="img-fluid"
          />
          <a href="#!">
            <div
              class="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
            ></div>
          </a>
        </div>
        <div class="card-body">
          <h5 class="card-title">{title}</h5>
          <p class="card-text">${price}</p>
          <div class="mt-2 radio-buttons">
            {colorImg.map((colorbtn) => {
              return (
                <label class="radio">
                  <button
                    className="round-button"
                    name="colorsBtn"
                    value={colorbtn.img}
                    onClick={(e) => onradioBtnChange(e)}
                    style={{ backgroundColor: colorbtn.color }}
                  />
                  <span></span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
