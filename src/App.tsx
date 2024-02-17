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

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <CategoryPanel />
        <BrandPanel />
      </div>
      <Carousel />
      <ExploreMoreCategoriesCarousel />
      <ExploreMoreProducts />
      <Footer></Footer>
    </div>
  );
}

export default App;
