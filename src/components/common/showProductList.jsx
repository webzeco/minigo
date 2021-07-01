import React, {  useState } from "react";

import ProductCard from "./ProductCard";

const ProductList = ({ pageDataList }) => {
  return (
    <>
      <div className="row">
        {pageDataList &&
          pageDataList.map((product, index) => {
            const { images, title, price } = product;
            const colorImg = [];
            // variants adjusted to colorImg array by  map method
            product.variants.map((variant) => {
              if (variant.selectedOption === "Color") {
                variant.tags.map((tag) => {
                  let colorData = {};
                  colorData.color = tag.text;
                  colorData.img = tag.img;
                  colorImg.push(colorData);
                });
              }
            });

            return (
              <ProductCard
                product={product}
                key={index}
                images={images}
                title={title}
                price={price}
                colorImg={colorImg}
              />
            );
          })}
      </div>
    </>
  );
};

export default ProductList;
