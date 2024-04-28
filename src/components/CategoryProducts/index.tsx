import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { baseUrl } from "../../axios.config";
import Product from "../../types/Product.type";
import Carousel from "../Carousel";

interface CategoryProductsProps {}

const CategoryProducts: React.FC<CategoryProductsProps> = () => {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const products = await (
        await axios.get(baseUrl + "/products/category/" + id?.toLowerCase())
      ).data;
      setProducts(products);
    };
    fetch();
  }, [id]);

  if (!id) return null;
  return (
    <div className="px-16 py-10">
      <Carousel hideViewButton showAll category={id} products={products} />
    </div>
  );
};

export default CategoryProducts;
