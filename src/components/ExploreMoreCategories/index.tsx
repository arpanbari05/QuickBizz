// ExploreMoreCategoriesCarousel.tsx

import React from "react";
import CategoryCard from "../CategoryCard";
import "./ExploreMoreCategories.css";

import { BsPhone } from "react-icons/bs";
import { BsSmartwatch } from "react-icons/bs";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { IoCameraOutline } from "react-icons/io5";
import { PiHeadphones } from "react-icons/pi";
import { IoGameControllerOutline } from "react-icons/io5";

const ExploreMoreCategoriesCarousel: React.FC = () => {
  // Dummy data for category cards
  const categories = [
    { name: "Phones", icon: <BsPhone size={45} /> },
    { name: "Computers", icon: <HiOutlineComputerDesktop size={45} /> },
    { name: "SmartWatches", icon: <BsSmartwatch size={45} /> },
    { name: "Camera", icon: <IoCameraOutline size={45} /> },
    { name: "HeadPhones", icon: <PiHeadphones size={45} /> },
    { name: "Gaming", icon: <IoGameControllerOutline size={45} /> },
    // Add more categories as needed
  ];

  return (
    // <div className="categories-carousel-container">
    //   <h2 className="explore-more-categories">Explore More Categories</h2>
    //   <div className="categories-carousel">
    //     <div className="scrollable-categories-carousel w-full">
    //       {categories.map((category, index) => (
    //         <CategoryCard key={index} {...category} />
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div className="carousel-container">
      <p className="text-primary font-bold mb-3">Categories</p>
      <h2 className="text-black text-3xl font-bold mb-7">
        Browse By Categories
      </h2>
      <div className="carousel">
        <div className="w-full overflow-x-auto flex gap-5">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMoreCategoriesCarousel;
