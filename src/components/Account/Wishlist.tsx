import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../axios.config";
import Product from "../../types/Product.type";
import Carousel from "../Carousel";

interface WishlistedProductsProps {}

const WishlistedProducts: React.FC<WishlistedProductsProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const userId = localStorage.getItem("user");

  useEffect(() => {
    const fetch = async () => {
      const products = await (
        await axios.get(baseUrl + "/wishlist/" + userId)
      ).data;
      setProducts(products);
    };
    fetch();
  }, [userId]);

  return (
    <div>
      {products.length > 0 ? (
        <div>
          <h2 className="text-xl text-primary">Wishlist</h2>
          <Carousel showAll hideViewButton products={products} />
        </div>
      ) : (
        <h1 className="text-5xl my-6 mx-auto">Wishlist is empty!</h1>
      )}
    </div>
  );
};

export default WishlistedProducts;
