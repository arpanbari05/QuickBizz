// Carousel.tsx

import React from "react";
import ProductCard from "../ProductCard";
import "./Carousel.css";

const Carousel: React.FC = () => {
  // Dummy data for product cards
  const products = [
    { discount: 20, productName: "Product A", price: 50, rating: 4.5 },
    { discount: 15, productName: "Product B", price: 40, rating: 4.0 },
    { discount: 30, productName: "Product C", price: 60, rating: 4.8 },
    { discount: 25, productName: "Product D", price: 45, rating: 4.2 },
    // Add more products as needed
  ];

  return (
    <div className="carousel-container">
      <h2 className="flash-sales">Flash Sales</h2>
      <div className="carousel">
        <div className="scrollable-carousel">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
