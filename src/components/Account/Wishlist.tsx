import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../axios.config";
import Product from "../../types/Product.type";
import Carousel from "../Carousel";
import GridLoader from "../Loader/GridLoader";

interface WishlistedProductsProps {}

const WishlistedProducts: React.FC<WishlistedProductsProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loader, setLoader] = useState(false);
  const userId = localStorage.getItem("user");

  useEffect(() => {
    const fetch = async () => {
      setLoader(true);
      try {
        const products = await (
          await axios.get(baseUrl + "/wishlist/" + userId)
        ).data;
        setProducts(products);
      } catch (e) {}
      setLoader(false);
    };
    fetch();
  }, [userId]);

  return (
    <div>
      {loader && <GridLoader />}
      {products.length > 0 ? (
        <div>
          <h2 className="text-xl text-primary">Wishlist</h2>
          <Carousel showAll hideViewButton products={products} />
        </div>
      ) : !loader ? (
        <h1 className="text-5xl my-6 mx-auto">Wishlist is empty!</h1>
      ) : null}
    </div>
  );
};

export default WishlistedProducts;
