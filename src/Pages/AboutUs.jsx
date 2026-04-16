import React from 'react'

export const AboutUs = () => {
  return (
     <div className="about_wrapper">

      {/* Hero Section */}
      <div className="about_hero">
        <h1>About ShopEase</h1>
        <p>Your one-stop destination for quality products at the best prices</p>
      </div>

      {/* Story Section */}
      <div className="about_section">
        <h2>Our Story</h2>
        <p>
          ShopEase was founded with a simple mission — to make online shopping easy,
          affordable, and enjoyable for everyone. We started as a small online store
          and have now grown into a trusted platform serving thousands of customers.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="about_grid">
        <div className="about_card">
          <h3>Our Mission</h3>
          <p>
            To provide high-quality products with a seamless shopping experience
            and excellent customer service.
          </p>
        </div>

        <div className="about_card">
          <h3>Our Vision</h3>
          <p>
            To become one of the most customer-centric ecommerce platforms
            delivering value and trust worldwide.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="about_section">
        <h2>Why Choose Us</h2>
        <ul>
          <li>✔ Wide range of products</li>
          <li>✔ Affordable pricing</li>
          <li>✔ Fast and secure delivery</li>
          <li>✔ Easy returns & support</li>
        </ul>
      </div>

      {/* Stats */}
      <div className="about_stats">
        <div>
          <h2>10K+</h2>
          <p>Happy Customers</p>
        </div>
        <div>
          <h2>500+</h2>
          <p>Products</p>
        </div>
        <div>
          <h2>4.8★</h2>
          <p>Customer Rating</p>
        </div>
      </div>

    </div>
  )
}
