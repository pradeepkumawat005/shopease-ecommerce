import React from 'react'
import { useState } from 'react';
import '../components/QuantityBox.css'

export const QuantityBox = ({quantitybox , setQuantity}) => {
  
  const decreaseQty = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQty = () => {
    setQuantity(prev => prev + 1);
  };

  return (
    <div className='quantity_box'>
    <h4 className='quantity_title'>Quantiy:</h4>
    <div className="quantity_wrapper">
      <button onClick={decreaseQty}>-</button>
      
      <span>{quantitybox}</span>
      
      <button onClick={increaseQty}>+</button>
    </div>
    </div>
  );
}
