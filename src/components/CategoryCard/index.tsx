// CategoryCard.tsx

import React from "react";
import { useNavigate } from "react-router";
import "./CategoryCard.css";

interface CategoryCardProps {
  name: string;
  icon: JSX.Element;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, icon }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/category/" + name);
  };
  return (
    <div
      onClick={handleClick}
      className="category-card flex items-center justify-center gap-4 flex-col w-full p-6 py-8 text-gray-800 hover:bg-primary active:bg-white hover:text-white"
    >
      <div className="text-center">{icon}</div>
      <div className="category-name">{name}</div>
    </div>
  );
};

export default CategoryCard;
