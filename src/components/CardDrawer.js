import React, { useContext, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { AppContext } from '../ContextApp/AppContext';
import '../components/CartDrawer.css';
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
export const CardDrawer = ({cartTotalItemSet}) => {
  const navigate = useNavigate();
  const { drawerOpen, setdrawer, cartItems, setCartItems } = useContext(AppContext);

  // ✅ Total Price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  // ✅ Load from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(data);
    cartTotalItemSet(cartItems.length)
  }, [drawerOpen]);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Delete Item
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  // ✅ Increase Quantity
  const increaseQty = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  // ✅ Decrease Quantity
  const decreaseQty = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  return (
    <div className={`cart-drawer ${drawerOpen ? "open" : ""}`}>

      {/* Header */}
      <div className='drawer-header'>
        <h3>Cart</h3>
        <button onClick={() => setdrawer(false)}>
          <IoCloseOutline />
        </button>
      </div>

      {/* Cart Items */}
      <div className='cart-items'>
        {cartItems.length === 0 ? (
          <p className='notproducts'>Cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">

              <div className='cart-image'>
                <img src={item.thumbnail} alt={item.title} />
              </div>

              <div className='cart-info'>
               
                <h4>{item.title}</h4>

                {/* ✅ FIXED PRICE DISPLAY */}
                <h5>
     
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </h5>

                {/* ✅ Quantity Selector */}
                <div className='qty-box quantity_wrapper'>
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

              </div>
                {/* ✅ Remove Button */}
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                 <AiOutlineDelete />
                </button>

            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className='drawer-footer'>
        <div className='footer-content'>
          <p className='subtotal'>SubTotal</p>
          <p className='subtotal_price'>${totalPrice.toFixed(2)}</p>
        </div>

        <button className='primary-btn' onClick={() => navigate('/checkout')} >Checkout</button>
      </div>

    </div>
  );
};