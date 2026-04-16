import React, { useState } from "react";
import "./Footer.css";
import { CiLocationOn } from "react-icons/ci";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa6";

const Footer = () => {
  const [subscribe , setSubscribed] = useState(false);

  function formHandler(e){
    e.preventDefault();
    setSubscribed(true)
    toast.success('Subscribe Succesfully')
  }
  return (
    <footer className="footer">
      <div className="footer-container page-width">
        
        {/* Brand Section */}
        <div className="footer-section">
          <a aria-current="page" class="logo_box active" href="/" data-discover="true"><span>Shop</span><span>Ease</span></a>
          <p className="address_main"> <CiLocationOn fontSize={'1.2rem'} />ShopEase Store
            742 Evergreen Terrace
            Springfield, IL 62704
            USA</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Shop All</a></li>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
          </ul>
        </div>

         {/* Quick Links */}
        <div className="footer-section">
          <h3>Category</h3>
          <ul>
            <li><a href="/">Laptops</a></li>
            <li><a href="/shop">Furniture</a></li>
            <li><a href="/cart">Beauty</a></li>
            <li><a href="/contact">Skin Care</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/shipping">Shipping Info</a></li>
            <li><a href="/faq">FAQs</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3>Subscribe</h3>
          <p>Get latest deals and offers</p>
          <form onSubmit={formHandler}>
          <input type="email" placeholder="Enter your email"  required/>
          {subscribe ?  <button className="subscribed_icon"><FaCheck /></button> :  <button >Subscribe</button> }       
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 ShopEase. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;