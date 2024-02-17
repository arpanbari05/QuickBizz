// ExploreMoreCategoriesCarousel.tsx

import React from "react";
import CategoryCard from "../CategoryCard";
import "./ExploreMoreCategories.css";

const ExploreMoreCategoriesCarousel: React.FC = () => {
  // Dummy data for category cards
  const categories = [
    { categoryName: "Electronics", imageUrl: "url-to-electronics-image" },
    { categoryName: "Furniture", imageUrl: "url-to-furniture-image" },
    { categoryName: "Construction", imageUrl: "url-to-construction-image" },
    { categoryName: "Supplies", imageUrl: "url-to-supplies-image" },
    { categoryName: "Drugs & Pharma", imageUrl: "url-to-drugs-pharma-image" },
    // Add more categories as needed
  ];

  return (
    <div className="categories-carousel-container">
      <h2 className="explore-more-categories">Explore More Categories</h2>
      <div className="categories-carousel">
        <div className="scrollable-categories-carousel">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMoreCategoriesCarousel;
