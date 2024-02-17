// Navbar.tsx

import React from "react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">Logo</div>
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
