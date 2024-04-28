// Carousel.tsx

import React, { useState } from "react";
import { HiChevronRight } from "react-icons/hi2";
import Product from "../../types/Product.type";
import ProductCard from "../ProductCard";
import "./Carousel.css";

interface CarouselProps {
  title?: string;
  category?: string;
  products: Product[];
  showAll?: boolean;
  hideViewButton?: boolean;
  onProductClick?: (product: Product) => void;
  itemCount?: number;
}

const Carousel: React.FC<CarouselProps> = (props) => {
  const [showAll, setShowAll] = useState(props.showAll);
  const itemCount = props.itemCount || 5;

  const products = !showAll
    ? props.products.slice(0, itemCount)
    : props.products;

  return (
    <div className="carousel-container">
      {props.title && (
        <p className="text-primary font-bold mb-3">{props.title}</p>
      )}
      <div className="flex items-center justify-between">
        <h2 className="text-black text-3xl font-bold mb-7">{props.category}</h2>
        {!props.hideViewButton && (
          <button
            className="text-red-500 flex gap-1 items-center"
            onClick={() => setShowAll((prev) => !prev)}
          >
            <div className="text-sm font-bold">
              {showAll ? "View less" : "View more"}
            </div>
            <HiChevronRight size={15} />
          </button>
        )}
      </div>
      <div
        className="grid w-full gap-5"
        style={{ gridTemplateColumns: `repeat(${itemCount}, 1fr)` }}
      >
        {products.map((product, index) => (
          <ProductCard
            key={index}
            {...product}
            onClick={props.onProductClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
