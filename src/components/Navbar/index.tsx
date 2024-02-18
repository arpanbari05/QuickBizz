// Navbar.tsx

import React from "react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="discount">Monsoon Sale For All Electronic And Free Express Delivery - OFF 50%!</div>
      <div className="shop-button">
        <button>Shop Now</button>
      </div>
      <div className="logo">QuickBizz</div>
      <div className="nav-buttons">
        <button className="nav-button">Home</button>
        <button className="nav-button">Contact</button>
        <button className="nav-button">About</button>
        <button className="nav-button">Signup</button>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>
    </nav>
  );
};

export default Navbar;
