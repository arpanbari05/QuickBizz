import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-item footer-subscribe">
          <h3>Subscribe</h3>
          <p>Get 10% off your first order</p>
          <form className="footer-email-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        <div className="footer-item footer-support">
          <h3>Support</h3>
          <p>SPIT, Bhavan's campus, Andheri</p>
          <p>help@QuickBizz.com</p>
          <p>+91-9191919191</p>
        </div>

        <div className="footer-item footer-account">
          <h3>Account</h3>
          <ul>
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
          </ul>
        </div>

        <div className="footer-item footer-quick-links">
          <h3>Quick Link</h3>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      <div className="footer-download-app">
        <p>Download App</p>
        <p>Save $3 with App New User Only</p>
        <button className="footer-download-app-button">
          <span className="footer-download-app-text">GET IT ON</span>
          <img
            className="footer-download-app-icon"
            src="path/to/google-play-badge.svg"
            alt="Google Play"
          />
          <img
            className="footer-download-app-icon"
            src="path/to/app-store-badge.svg"
            alt="App Store"
          />
        </button>
      </div>
      <div className="footer-item footer-copyright">
          <p>&copy; Copyright QuickBizz 2024. All right reserved</p>
        </div>
    </footer>
  );
}

export default Footer;
