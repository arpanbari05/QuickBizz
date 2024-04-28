// ProductPage.tsx
import axios, { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { PiTruckLight } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../axios.config";
import Product from "../../types/Product.type";
import User from "../../types/User.type";
import Carousel from "../Carousel";
import ImageWithFallback from "../ImageWithFallback";
import { GrPowerCycle } from "react-icons/gr";
import GridLoader from "../Loader/GridLoader";
import DetailLoader from "../Loader/DetailLoader";
import { UserContext } from "../../App";

const ProductPage: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [sellers, setSellers] = useState<User[]>([]);
  const { id } = useParams();
  const [activeSeller, setActiveSeller] = useState("");
  const { userId } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [relatedProductLoader, setRelatedProductLoader] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (product && product.sold_by?.length) {
        const promises: Promise<AxiosResponse>[] = [];
        product.sold_by?.forEach(async (seller) => {
          const promise = axios.get(baseUrl + "/user/" + seller);
          promises.push(promise);
        });
        const res = await Promise.all(promises);
        const sellers: User[] = res.map((res) => res.data);
        setSellers(sellers);
        setActiveSeller(sellers[0]._id);
      }
    };
    fetch();
  }, [product]);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const handleBuyNow = () => {
    try {
      axios.post(baseUrl + "/cart/add", {
        product_id: product?._id,
        user_id: userId,
        quantity,
        seller: activeSeller,
      });
      navigate("/cart");
    } catch (e) {}
  };

  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoader(true);
        const product = await (
          await axios.get(baseUrl + "/products/" + id)
        ).data;
        setProduct(product);
        setRelatedProductLoader(true);
        try {
          const categoryProducts = (await (
            await axios.get(baseUrl + "/products/category/" + product.category)
          ).data) as Product[];
          setCategoryProducts(categoryProducts);
        } catch (e) {}
        setRelatedProductLoader(false);
      } catch (e) {}
      setLoader(false);
    };
    fetch();
  }, [id]);

  if (loader)
    return (
      <div className="px-16 py-10">
        <DetailLoader />
      </div>
    );

  if (!product) return <p>Product Not Found!</p>;

  const ratingStars = [];
  for (let i = 0; i < Math.floor(product.ratings); i++) {
    ratingStars.push(<IoStar size={20} color="FFAD33" />);
  }
  for (let i = 0; i < 5 - product.ratings; i++) {
    ratingStars.push(<IoStarOutline size={20} />);
  }

  return (
    <div className="px-16 py-10">
      <div className="flex mb-20">
        {/* Big Image and Product Details */}
        <div className="flex-1 flex items-start">
          {/* Big Image */}
          <ImageWithFallback
            src={product.image}
            fallbackSrc={
              "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
            }
            alt={product.name}
            className="w-[35rem] h-[35rem] object-cover rounded-lg p-20 mr-16"
          />

          {/* Product Details */}
          <div className="flex flex-col mr-0 md:mr-64 gap-2">
            <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
            <div className="flex items-center mb-2">
              {/* Rating */}
              <div className="flex items-center mr-4">
                <div className="flex gap-1">{ratingStars}</div>
                <span className="ml-1 text-gray-700">
                  ({product.no_of_reviews})
                </span>
              </div>
            </div>
            {/* Price */}
            <div className="text-xl font-semibold">
              ${product.price.toFixed(2)}
            </div>
            <p className="text-gray-600 mb-7">{product.description}</p>

            <div className="flex gap-7">
              {/* Quantity Selector */}
              <div className="flex mb-4 border border-gray-700 rounded-sm">
                <button
                  className="px-4"
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <span className="border-l border-r px-6 border-gray-700 flex items-center">
                  {quantity}
                </span>
                <button
                  className="px-4"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                className="bg-primary text-white py-3 mb-4 rounded-sm hover:opacity-70 active:opacity-90 w-full"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>

            {sellers.length > 0 && (
              <div className="my-5">
                <div className="flex gap-2 items-center">
                  <p className="text-primary">Seller: </p>
                  <select
                    name="seller"
                    id="seller"
                    onChange={(e) => setActiveSeller(e.target.value)}
                  >
                    {sellers.map((seller) => (
                      <option value={seller._id} key={seller._id}>
                        {seller.first_name + " " + seller.last_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Delivery Info */}
            <div className="grid border rounded-md border-gray-500">
              <div className="flex p-6 items-center gap-4 border-b border-gray-500">
                <PiTruckLight size={30} />
                <div>
                  <div className="text-md text-medium mb-3">Free Delivery</div>
                  <div className="text-sm">
                    Enter your postal code for Delivery Availability
                  </div>
                </div>
              </div>
              <div className="flex p-6 items-center gap-4">
                <GrPowerCycle size={30} />
                <div>
                  <div className="text-md text-medium mb-3">
                    Return Delivery
                  </div>
                  <div className="text-sm">
                    Free 30 Days Delivery Returns. Details
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {relatedProductLoader ? (
        <GridLoader />
      ) : (
        <Carousel category="Similar products" products={categoryProducts} />
      )}
    </div>
  );
};

export default ProductPage;
