import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoEyeOutline, IoStar, IoStarOutline } from "react-icons/io5";
import ProductType from "../../types/Product.type";
import axios from "axios";
import { baseUrl } from "../../axios.config";
import ImageWithFallback from "../ImageWithFallback";

interface ProductCardProps extends ProductType {}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  ratings,
  _id,
  image,
}) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const userId = localStorage.getItem("user");

  useEffect(() => {
    const fetch = async () => {
      if (userId) {
        const res = await axios.get(baseUrl + `/wishlist/check`, {
          params: {
            user_id: userId,
            product_id: _id,
          },
        });
        const isWishlisted = res.data.wishlist_status;
        setLiked(isWishlisted);
      }
    };
    fetch();
  }, [_id, userId]);

  const handleAddToWishlist: React.MouseEventHandler<
    HTMLButtonElement
  > = async (e) => {
    e.stopPropagation();
    try {
      await axios.post(baseUrl + "/wishlist/add", {
        user_id: userId,
        product_id: _id,
      });
      setLiked(true);
    } catch (e) {}
  };

  const handleRemoveFromWishlist: React.MouseEventHandler<
    HTMLButtonElement
  > = async (e) => {
    e.stopPropagation();
    try {
      await axios.delete(baseUrl + `/wishlist/remove`, {
        params: {
          user_id: userId,
          product_id: _id,
        },
      });
      setLiked(false);
    } catch (e) {}
  };

  const handleProductClick = () => {
    navigate("/product/" + _id);
  };

  const ratingStars = [];
  for (let i = 0; i < Math.floor(ratings); i++) {
    ratingStars.push(<IoStar size={20} color="FFAD33" />);
  }
  for (let i = 0; i < 5 - ratings; i++) {
    ratingStars.push(<IoStarOutline size={20} />);
  }

  const fallbackImage =
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";
  return (
    <button className="w-full" onClick={handleProductClick}>
      <div className="relative w-full rounded-md">
        <ImageWithFallback src={image} fallbackSrc={fallbackImage} />
        {/* <div className="w-max absolute top-3 left-3 p-1 px-2 text-xs text-white rounded-sm bg-primary">
          {discount}% OFF
        </div> */}
        <div className="w-max flex flex-col absolute top-3 right-3 gap-2">
          {liked ? (
            <button
              className="bg-white rounded-full p-1"
              onClick={handleRemoveFromWishlist}
            >
              <IoMdHeart size={20} />
            </button>
          ) : (
            <button
              className="bg-white rounded-full p-1"
              onClick={handleAddToWishlist}
            >
              <IoIosHeartEmpty size={20} />
            </button>
          )}
          <div className="bg-white rounded-full p-1">
            <IoEyeOutline size={20} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 py-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex w-max gap-2">
          <p className="text-md text-primary">${price}</p>
          <s className="text-md text-gray-500">discount</s>
        </div>
        <div className="flex w-max gap-2">
          <div className="flex gap-1">{ratingStars}</div>
          <p className="rating">{ratings}</p>
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
