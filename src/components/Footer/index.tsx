// Footer.tsx

import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            QuickBizz is your one-stop destination for all your shopping needs.
            Explore a wide range of products from various categories and enjoy a
            seamless shopping experience.
          </p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@quickbizz.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Categories</li>
            <li>Flash Sales</li>
            <li>Explore More Categories</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 QuickBizz. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
