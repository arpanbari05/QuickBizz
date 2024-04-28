import axios from "axios";
import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { baseUrl } from "../../axios.config";

interface ProductFormState {
  name: string;
  price: number;
  description: string;
  discount: number;
  category: string;
  image: string | null;
  sold_by: string[];
}

const categories = [
  { name: "Phones", value: "phones" },
  { name: "Computers", value: "computers" },
  { name: "SmartWatches", value: "smartwatches" },
  { name: "Camera", value: "camera" },
  { name: "HeadPhones", value: "headphones" },
  { name: "Gaming", value: "gaming" },
  // Add more categories as needed
];

const ProductForm: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { userId } = useContext(UserContext);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "discount":
        setDiscount(value);
        break;
      case "category":
        setCategory(value);
        break;
      default:
        break;
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setImage(file || null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (userId) {
      const formData: ProductFormState = {
        name,
        price: +price,
        description,
        discount: +discount,
        category,
        image: "",
        sold_by: [userId],
      };
      // Handle form submission here, e.g., send formData to backend

      try {
        await axios.post(baseUrl + "/products", formData);
        alert("Your product was added successfully");
        setName("");
        setDescription("");
        setCategory("");
        setDiscount("");
        setImage(null);
        setPrice("");
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <form className="grid" onSubmit={handleSubmit}>
      <div className="flex justify-between items-center mb-7">
        <h2 className="text-xl font-medium text-primary">
          Create your own product and Sell
        </h2>
        <Link
          to={"/account/sell-existing-product"}
          className="text-sm text-primary underline hover:opacity-90 active:opacity-70"
        >
          Want to sell existing products?
        </Link>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col w-full">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Iphone 13 Pro"
            onChange={handleChange}
            className="py-2 text-sm px-2 bg-gray-100 rounded-sm text-gray-600 focus:outline-1 focus:outline-primary"
          />
        </div>
        <br />
        <div className="flex flex-col w-full">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            placeholder="$999"
            value={price}
            onChange={handleChange}
            className="py-2 text-sm px-2 bg-gray-100 rounded-sm text-gray-600 focus:outline-1 focus:outline-primary"
          />
        </div>
      </div>
      <br />
      <div className="flex flex-col">
        <label>Description:</label>
        <input
          type="text"
          name="description"
          placeholder="A15 Bionic chip with 6-core CPU (2 performance and 4 efficiency cores), 5-core GPU, and 16-core Neural Engine"
          value={description}
          onChange={handleChange}
          className="py-2 text-sm px-2 bg-gray-100 rounded-sm text-gray-600 focus:outline-1 focus:outline-primary"
        />
      </div>
      <br />
      <div className="flex gap-5">
        <div className="flex flex-col w-full">
          <label>Discount:</label>
          <input
            type="number"
            name="discount"
            placeholder="99"
            value={discount}
            onChange={handleChange}
            className="py-2 text-sm px-2 bg-gray-100 rounded-sm text-gray-600 focus:outline-1 focus:outline-primary"
          />
        </div>
        <br />
        <div className="flex flex-col w-full">
          <label>Category:</label>
          <select
            name="category"
            value={category}
            onChange={handleChange}
            className="py-2 text-sm px-2 bg-gray-100 rounded-sm text-gray-600 focus:outline-1 focus:outline-primary"
          >
            <option value="">Select</option>
            {categories.map((category) => (
              <option value={category.value}>{category.name}</option>
            ))}
            {/* Add other categories as needed */}
          </select>
        </div>
      </div>
      <br />
      <div className="flex flex-col">
        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="py-2 text-sm px-2 bg-gray-100 rounded-sm text-gray-600 focus:outline-1 focus:outline-primary"
        />
      </div>
      <br />
      <button
        type="submit"
        className="ml-auto py-3 text-sm px-7 bg-primary rounded-sm hover:opacity-90 active:opacity-70 text-white"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
