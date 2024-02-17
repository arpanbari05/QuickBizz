// ProductCard.tsx

import React from "react";
import "./ProductCard.css";

interface ProductCardProps {
  discount: number;
  productName: string;
  price: number;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  discount,
  productName,
  price,
  rating,
}) => {
  return (
    <div className="product-card">
      <div className="discount-badge">{discount}% OFF</div>
      <div className="product-image">
        <div className="icons">
          <span className="icon">&#9733;</span>
          <span className="icon">&#128065;</span>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{productName}</h3>
        <p className="price">${price}</p>
        <p className="rating">Rating: {rating}/5</p>
      </div>
    </div>
  );
};

export default ProductCard;
