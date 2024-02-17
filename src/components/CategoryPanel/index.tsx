// CategoryPanel.tsx

import React from "react";
import "./CategoryPanel.css";

const CategoryPanel: React.FC = () => {
  const categories = [
    "Electronics",
    "Furniture",
    "Construction",
    "Supplies",
    "Drugs & Pharma",
    "Electrical",
    "Home & Kitchen",
    "Clothing & Accessories",
    "Sanitaryware",
  ];

  return (
    <div className="category-panel">
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPanel;
