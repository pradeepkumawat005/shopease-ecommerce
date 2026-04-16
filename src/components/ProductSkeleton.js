import React from 'react';
import '../components/ProductSkeleton.css';
import '../components/Card.css'

export const ProductSkeleton = () => {
  return (
  <div className="product-card skeleton-card">
  <div className="image-wrraper skeleton-box">
    
    <div className="first-image skeleton-box"></div>
    <span className="badge skeleton-box"></span>

  </div>

  <div className="title-wrapper">
    <div className="title skeleton-box"></div>
  </div>

  <div className="product-price skeleton-box"></div>
</div>
  );
};