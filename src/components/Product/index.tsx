// ProductPage.tsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../axios.config";
import Product from "../../types/Product.type";
import Carousel from "../Carousel";

const ProductPage: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();
  const user = localStorage.getItem("user");

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const handleBuyNow = () => {
    try {
      const res = axios.post(baseUrl + "/cart/add", {
        product_id: product?._id,
        user_id: user,
        quantity,
      });
      navigate("/cart");
    } catch (e) {}
  };

  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const product = await (await axios.get(baseUrl + "/products/" + id)).data;
      setProduct(product);
      if (product) {
        const categoryProducts = (await (
          await axios.get(baseUrl + "/products/category/" + product.category)
        ).data) as Product[];
        setCategoryProducts(categoryProducts);
      }
    };
    fetch();
  }, []);

  if (!product) return <p>Loading</p>;

  return (
    <div>
      <div className="flex p-8">
        {/* Small Images */}
        {/* <div className="flex flex-col mr-8">
          <img
            src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
            alt={product.name}
            className="w-32 h-32 rounded-lg shadow-md mb-2"
          />
          <img
            src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
            alt={product.name}
            className="w-32 h-32 rounded-lg shadow-md mb-2"
          />
          <img
            src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
            alt={product.name}
            className="w-32 h-32 rounded-lg shadow-md mb-2"
          />
        </div> */}

        {/* Big Image and Product Details */}
        <div className="flex-1 flex items-start">
          {/* Big Image */}
          <img
            src={
              product.image ||
              "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
            }
            alt={product.name}
            className="w-[35rem] h-[35rem] object-cover rounded-lg shadow-lg mr-8"
          />

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
            <div className="flex items-center mb-2">
              {/* Rating */}
              <div className="flex items-center mr-4">
                <span className="text-yellow-500">&#9733;</span>
                <span className="ml-1 text-gray-700">{product.ratings}</span>
              </div>

              {/* Price */}
              <div className="text-xl font-semibold">${product.price}</div>
            </div>

            <p className="text-gray-600 mb-4">{product.description}</p>

            {/* Sizes */}
            {/* <div className="flex items-center space-x-2 mb-4">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`p-2 border rounded-md ${
                    selectedSize === size
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => handleSizeSelection(size)}
                >
                  {size}
                </button>
              ))}
            </div> */}

            {/* Quantity Selector */}
            <div className="flex items-center mb-4">
              <button
                className="p-2 border rounded-md"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <span className="mx-4">{quantity}</span>
              <button
                className="p-2 border rounded-md"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              className="bg-blue-500 text-white p-2 mb-4 rounded-md"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>

            {/* Delivery Info */}
            <div className="flex flex-col items-start">
              <p className="text-green-500 mb-1">Free Delivery</p>
              <p className="text-gray-500">Return within 30 days for free</p>
            </div>
          </div>
        </div>
      </div>
      <Carousel category="Similar products" products={categoryProducts} />
    </div>
  );
};

export default ProductPage;
