// BrandPanel.tsx

import React from "react";
import "./BrandPanel.css";

import Havells from "../../assets/havells.png";
import Grow from "../../assets/grow.webp";

const BrandPanel: React.FC = () => {
  const brands = ["Brand A", "Brand B", "Brand C", "Brand D"];

  return (
    <div className="brand-panel">
      <img
        src={Grow}
        alt="grow-image"
        className="w-full h-[500px] object-cover"
      />
    </div>
  );
};

export default BrandPanel;
