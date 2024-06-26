import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../axios.config";
import Product from "../../types/Product.type";
import Carousel from "../Carousel";
import { TbDeviceImacSearch } from "react-icons/tb";
import { FaRegSadTear } from "react-icons/fa";

interface SearchPanelProps {}

const categories = [
  { name: "Phones", value: "phones" },
  { name: "Computers", value: "computers" },
  { name: "SmartWatches", value: "smartwatches" },
  { name: "Camera", value: "camera" },
  { name: "HeadPhones", value: "headphones" },
  { name: "Gaming", value: "gaming" },
  // Add more categories as needed
];

const SearchPanel: React.FC<SearchPanelProps> = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[] | null>(null);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      if (searchQuery) {
        const products = await (
          await axios.get(baseUrl + "/search", {
            params: { query: searchQuery },
          })
        ).data;
        setProducts(products);
      }
    };
    fetch();
  }, [searchQuery]);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (category) {
          const products = (
            await axios.get(baseUrl + "/products/category/" + category)
          ).data;
          setProducts(products);
        }
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

  return (
    <div className="px-20 py-3 min-h-[100vh]">
      <div className="flex items-center gap-12">
        <div className="logo">QuickBizz</div>
        <div className="w-full flex items-center rounded-full overflow-hidden">
          <div className="relative flex-grow">
            <input
              autoFocus
              value={searchInput}
              placeholder="Search products"
              className="bg-gray-200 w-full text-gray-700 py-2 px-5 text-sm focus:outline-1 focus:outline-gray-300"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput && (
              <button
                onClick={() => {
                  setSearchInput("");
                  setSearchQuery("");
                }}
                className="text-gray-600 absolute top-[10px] right-[10px] border border-gray-600 rounded-full"
              >
                <IoClose size={15} />
              </button>
            )}
          </div>
          <button
            className="bg-primary px-4 py-2 text-white active:opacity-70 hover:opacity-90"
            onClick={() => {
              setSearchQuery(searchInput);
            }}
          >
            <HiMagnifyingGlass size={20} />
          </button>
        </div>
        <button onClick={() => navigate(-1)}>
          <IoClose size={20} />
        </button>
      </div>
      <div>
        <div className="flex flex-col w-max my-7">
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
      </div>
      {products && products.length > 0 && (
        <Carousel products={products} hideViewButton showAll />
      )}
      {!products && (
        <div className="flex flex-col items-center justify-center gap-7 text-gray-600 mt-44">
          <TbDeviceImacSearch size={100} />
          <h1 className="text-2xl">Search any product</h1>
        </div>
      )}
      {products?.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-7 text-gray-600 mt-44">
          <FaRegSadTear size={100} />
          <h1 className="text-2xl">No product found!</h1>
        </div>
      )}
    </div>
  );
};

export default SearchPanel;
