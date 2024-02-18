// Navbar.tsx

import React from "react";
import "./Navbar.css";

import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handelSignup = () => {
    navigate("/signup", { replace: true });
  };

  const handleHome = () => {
    navigate("/", { replace: true });
  };

  const handleContact = () => {
    navigate("/contact", { replace: true });
  };

  const handleAbout = () => {
    navigate("/about", { replace: true });
  };
  return (
    <div>
      <div className="discount bg-black text-white text-center p-7">
        <p className="d-inline-block mb-0">Monsoon Sale For All Electronic And Free Express Delivery - OFF 50%!</p>
        <button className="ml-3">Shop Now</button>
      </div>


      
      <nav className="navbar">
        <div className="logo">QuickBizz</div>
        <div className="nav-buttons">
          <button className="nav-button" onClick={handleHome}>
            Home
          </button>
          <button className="nav-button" onClick={handleContact}>
            Contact
          </button>
          <button className="nav-button" onClick={handleAbout}>
            About
          </button>
          <button className="nav-button" onClick={handelSignup}>
            Signup
          </button>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;