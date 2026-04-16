import React, { useContext, useState , useEffect } from 'react';
import '../components/Card.css';
import { Rateing } from './Rateing';
import { PiShoppingCartThin } from "react-icons/pi";
import { AppContext } from '../ContextApp/AppContext';
import { Spinner } from './Spinner';
import { NavLink } from 'react-router-dom';



export const Card = ({product}) => {

  const {setdrawer , cartBox } = useContext(AppContext);
  
  useEffect(() => {
  const existingCart = localStorage.getItem("cartItems");

  if (!existingCart) {
    localStorage.setItem("cartItems", JSON.stringify([]));
  }
}, []);

  const [loading , setLoading] = useState(false);
  const [formData , setFormData] = useState({ id:`${product.id}` , quantity:'1'})
  function handleAtoCart(event){
    event.preventDefault();
     const {name , value , type} = event.target;
     setFormData((prev) => ({
       ...prev,
       [name]: value
     }
     ))
     setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    addToCart()
  }

    function addToCart(){
      fetch('https://dummyjson.com/carts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: formData.id,
        products: [
          {
            id: formData.id,
            quantity: formData.quantity,
          },
        ]
      })
    })
    .then(res => res.json())
    .then( data => {
    
    const newProduct = data.products[0];

    const existingIndex = cartBox.findIndex(
      item => item.id == newProduct.id
    );

    if (existingIndex !== -1) {
      cartBox[existingIndex].quantity =
        Number(cartBox[existingIndex].quantity) + Number(newProduct.quantity);
    } else {
      cartBox.push(newProduct);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartBox));
    }).finally(()=>{
      setdrawer(true);
    })
  } 


  return (
    <div className='product-card' id={product.id}>
       <div className='image-wrraper' >
       
        <img src={product.images[0]} className='first-image' />
        { product.images[1] != null &&
        <img src={product.images[1]} className='second-image' />
        }
        <span className='badge'>{product.availabilityStatus}</span>
  
        <form onSubmit={handleAtoCart}>
         <input type='hidden' name='quantity' value={formData.quantity} />
         <input type='hidden' name='id'  value={formData.id} />
        <button className='add-to-cart' id='atcbtn'> {loading ? (<Spinner/>) : (<PiShoppingCartThin />)} </button>
        </form>
       </div>
       <Rateing rating={product.rating} />
        <NavLink to={`/product/${product.id}`} className='title-wrapper'>
       <h4 className='title'>{product.title}</h4>
        </NavLink>
       <p className='product-price'>${product.price}</p>
    </div>
  )
}
