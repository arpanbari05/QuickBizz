import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { baseUrl } from "../../axios.config";
import Product from "../../types/Product.type";
import Carousel from "../Carousel";
import ExploreMoreCategoriesCarousel from "../ExploreMoreCategories";
import ImageWithFallback from "../ImageWithFallback";
import Modal from "../Modal";

const categories = [
  { name: "Phones", value: "phones" },
  { name: "Computers", value: "computers" },
  { name: "SmartWatches", value: "smartwatches" },
  { name: "Camera", value: "camera" },
  { name: "HeadPhones", value: "headphones" },
  { name: "Gaming", value: "gaming" },
  // Add more categories as needed
];

const SellExistingProduct = () => {
  const [category, setCategory] = useState(categories[0].value);
  const [products, setProducts] = useState<Product[]>([]);
  const [productToSell, setProductToSell] = useState<Product | null>(null);
  const { userId } = useContext(UserContext);
  const [confirmLoader, setConfirmLoader] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const products = (
          await axios.get(baseUrl + "/products/category/" + category)
        ).data;
        setProducts(products);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, [category]);

  const handleCategoryChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    setCategory(e.target.value);
  };

  const handleConfirmSeller = async () => {
    if (userId && productToSell) {
      try {
        setConfirmLoader(true);
        await axios.put(
          baseUrl + "/products/update/sold_by/" + productToSell._id,
          { seller: userId }
        );
        setProductToSell(null);
      } catch (e) {
        console.error(e);
      }
      setConfirmLoader(false);
    }
  };

  const fallbackImage =
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";

  return (
    <div>
      <div className="flex justify-between items-center mb-7">
        <div className="flex flex-col w-max">
          <label>Filter by Category:</label>
          <select
            name="category"
            value={category}
            onChange={handleCategoryChange}
            className="py-2 text-sm px-5 bg-gray-100 rounded-sm text-gray-600 focus:outline-1 focus:outline-primary"
          >
            <option value="">Select</option>
            {categories.map((category) => (
              <option value={category.value}>{category.name}</option>
            ))}
          </select>
        </div>
        <Link
          to={"/account/sell-product"}
          className="text-sm text-primary underline hover:opacity-90 active:opacity-70"
        >
          Didn't found what to sell? Create you own product.
        </Link>
      </div>

      <br />
      <Carousel
        products={products}
        onProductClick={setProductToSell}
        showAll
        hideViewButton
        itemCount={5}
      />
      {productToSell && (
        <Modal onClose={() => setProductToSell(null)}>
          <h2 className="text-xl text-primary font-medium">
            Become the seller of this product?
          </h2>
          <div className="flex gap-5">
            <ImageWithFallback
              src={productToSell.image}
              fallbackSrc={fallbackImage}
              className="w-24 h-24"
            />
            <div className="grid">
              <h3 className="text-md font-semibold">{productToSell.name}</h3>
              <p className="text-sm">{productToSell.category}</p>
              <p className="text-sm font-semibold text-primary">
                ${productToSell.price.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex gap-4 w-full mt-7">
            <button
              className="px-5 py-2 bg-gray-300 rounded-sm text-gray-600 hover:opacity-90 active:opacity-70 ml-auto"
              onClick={() => setProductToSell(null)}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmSeller}
              className="px-5 py-2 bg-primary rounded-sm text-white hover:opacity-90 active:opacity-70"
            >
              {confirmLoader ? "Confirming..." : "Confirm"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SellExistingProduct;
