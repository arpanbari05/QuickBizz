import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../axios.config";
import BrandPanel from "../BrandPanel";
import Carousel from "../Carousel";
import CategoryPanel from "../CategoryPanel";
import ExploreMoreCategoriesCarousel from "../ExploreMoreCategories";
import Product from "../../types/Product.type";

const Landing = () => {
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const saleProducts = (await axios.get(baseUrl + "/sales"))
        .data as Product[];
      setSaleProducts(saleProducts);
      const bestSellingProducts = (await axios.get(baseUrl + "/best-selling"))
        .data as Product[];
      setBestSellingProducts(bestSellingProducts);
    };
    fetch();
  }, []);

  return (
    <div>
      <div className="flex">
        <CategoryPanel />
        <BrandPanel />
      </div>
      <div className="p-16">
        <Carousel
          title="Today's"
          category="Flash Sales"
          products={saleProducts}
        />
        <ExploreMoreCategoriesCarousel />
        <Carousel
          title="This Month"
          category="Best Selling Products"
          products={bestSellingProducts}
        />
      </div>
    </div>
  );
};

export default Landing;
