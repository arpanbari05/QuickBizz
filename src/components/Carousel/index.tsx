// Carousel.tsx

import React from "react";
import Product from "../../types/Product.type";
import ProductCard from "../ProductCard";
import "./Carousel.css";

interface CarouselProps {
  title?: string;
  category: string;
  products: Product[];
}

const Carousel: React.FC<CarouselProps> = (props) => {
  return (
    <div className="carousel-container">
      {props.title && (
        <p className="text-primary font-bold mb-3">{props.title}</p>
      )}
      <h2 className="text-black text-3xl font-bold mb-7">{props.category}</h2>
      <div className="w-full flex gap-5 overflow-hidden">
        {props.products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
