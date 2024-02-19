import React, { useState } from "react";
import InnerCategoryCard from "../CategoryCard";
import "./ExploreMoreCategories.css";

interface Category {
  imgSrc: string;
  imgAlt: string;
  title: string;
}

interface InnerCategoryCardProps {
  imgSrc: string;
  imgAlt: string;
  title: string;
}

function CategoryBrowser() {
  const categories: Category[] = [
    { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/cf035321fc0dd26818a07f9747c54c442cfefc511954d20c2dd3af0c8838f31f", imgAlt: "Phones Category", title: "Phones" },
    { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/15e828142b5c7a67a9ebcee9050507dc8afca45108c28a3aeceec39f3c109b1c", imgAlt: "Computers Category", title: "Computers" },
    { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/8006d5bac4d2f8ad9af945406c32cdd3967e64de0962dea8ffbe749bf0137b12", imgAlt: "SmartWatch Category", title: "SmartWatch" },
    { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/347b30b89d24b0ed9d61ad6750bfd7e211af22d2064c58546fd4aedbaf8d8dfb", imgAlt: "HeadPhones Category", title: "HeadPhones" },
    { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c8eab9d196b1e29d912d409342d3ec8faf27266ec26535d1340336e54c2f8730", imgAlt: "Gaming Category", title: "Gaming" },
  ];

  const InnerCategoryCard: React.FC<InnerCategoryCardProps> = ({ imgSrc, imgAlt, title }) => (
    <div className="category-card">
      <img src={imgSrc} alt={imgAlt} className="category-image" />
      <div className="category-title">{title}</div>
    </div>
  );

  const [scrollOffset, setScrollOffset] = useState<number>(0);

  const handleScrollLeft = () => {
    if (scrollOffset > 0) {
      setScrollOffset(scrollOffset - 100);
    }
  };

  const handleScrollRight = () => {
    setScrollOffset(scrollOffset + 100);
  };

  return (
    <>
      <header className="header">
        <div>
          <h1>Categories</h1>
          <h2>Explore by Categories</h2>
        </div>
        
        <div className="scroll-arrows">
          <span className="scroll-arrow" onClick={handleScrollLeft}>{"<"}</span>
          <span className="scroll-arrow" onClick={handleScrollRight}>{">"}</span>
        </div>
      </header>
      <section className="category-display">
        <div className="category-list" style={{ transform: `translateX(${scrollOffset}px)` }}>
          {categories.map((category, index) => (
            <InnerCategoryCard key={index} {...category} />
          ))}
        </div>
      </section>
    </>
  );
}

export default CategoryBrowser;
