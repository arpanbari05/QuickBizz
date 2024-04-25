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
    navigate("/QuickBizz", { replace: true });
  };

  const handleContact = () => {
    navigate("/contact", { replace: true });
  };

  const handleAbout = () => {
    navigate("/about", { replace: true });
  };

  const handleWishlist = () => {
    navigate("/wishlist", { replace: true });
  };

  return (
    <div>
      <div className="discount bg-black text-white text-center p-7">
        <p className="d-inline-block mb-0">
          Monsoon Sale For All Electronic And Free Express Delivery - OFF 50%!
        </p>
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
          <button className="nav-button" onClick={handleWishlist}>
            Wishlist
          </button>
          <button className="nav-button" onClick={handelSignup}>
            Signup
          </button>
        </div>
        <input
          placeholder="Search products"
          className="bg-gray-200 text-gray-700 py-2 w-80 px-5 text-sm rounded-full focus:outline-1 focus:outline-gray-300"
        />
      </nav>
    </div>
  );
};

export default Navbar;
