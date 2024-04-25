import "./App.css";
import Navbar from "./components/Navbar";
import CategoryPanel from "./components/CategoryPanel";
import BrandPanel from "./components/BrandPanel";
import Carousel from "./components/Carousel";
import ExploreMoreCategoriesCarousel from "./components/ExploreMoreCategories";
import Footer from "./components/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NotFound from "./components/404";
import ProductPage from "./components/Product";
import CartPage from "./components/Cart";
import CheckoutPage from "./components/Checkout";
import About from "./components/About";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./types/Product.type";
import { baseUrl } from "./axios.config";
import CategoryProducts from "./components/CategoryProducts";
import PrivateRoute from "./components/PrivateRoute";
import React from "react";
import WishlistedProducts from "./components/Wishlist/Wishlist";

const products = [
  { discount: 20, name: "Product A", price: 50, rating: 4.5 },
  { discount: 15, name: "Product B", price: 40, rating: 4.0 },
  { discount: 30, name: "Product C", price: 60, rating: 4.8 },
  { discount: 25, name: "Product D", price: 45, rating: 4.2 },
  // Add more products as needed
];

const products2 = [
  { discount: 20, name: "Product A", price: 50, rating: 4.5 },
  { discount: 15, name: "Product B", price: 40, rating: 4.0 },
  { discount: 30, name: "Product C", price: 60, rating: 4.8 },
  { discount: 25, name: "Product D", price: 45, rating: 4.2 },
  { discount: 25, name: "Product D", price: 45, rating: 4.2 },
  { discount: 25, name: "Product D", price: 45, rating: 4.2 },
  // Add more products as needed
];

function App() {
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

  console.log({ saleProducts, bestSellingProducts });

  const Landing = (
    <div>
      <div className="flex">
        <CategoryPanel />
        <BrandPanel />
      </div>
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
  );

  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={Landing} />
        <Route path="/QuickBizz" element={Landing} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/wishlist" element={<WishlistedProducts />} />
        <Route path="/category/:id" element={<CategoryProducts />} />
        {/* If user is not logged in, redirect to login page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
