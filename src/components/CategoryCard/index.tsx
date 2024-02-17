// CategoryCard.tsx

import React from "react";
import "./CategoryCard.css";

interface CategoryCardProps {
  categoryName: string;
  imageUrl: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  categoryName,
  imageUrl,
}) => {
  return (
    <div className="category-card">
      <div
        className="category-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="category-name">{categoryName}</div>
    </div>
  );
};

export default CategoryCard;
