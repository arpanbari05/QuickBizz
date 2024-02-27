import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import CategoryPanel from "./components/CategoryPanel";
import BrandPanel from "./components/BrandPanel";
import Carousel from "./components/Carousel";
import ExploreMoreCategoriesCarousel from "./components/ExploreMoreCategories";
import Footer from "./components/Footer";
import ExploreMoreProducts from "./components/ExploreMoreProducts";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NotFound from "./components/404";
import ProductPage from "./components/Product";
import CartPage from "./components/Cart";
import CheckoutPage from "./components/Checkout";
import About from "./components/About";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={"/QuickBizz"} />} />
        <Route
          path="/QuickBizz"
          element={
            <div>
              <div style={{ display: "flex" }}>
                <CategoryPanel />
                <BrandPanel />
              </div>
              <Carousel />
              <ExploreMoreCategoriesCarousel />
              <ExploreMoreProducts />
            </div>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<About />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
