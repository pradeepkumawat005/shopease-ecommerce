import React, { useContext, useEffect , useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { AppContext } from '../ContextApp/AppContext';
import {Spinner}  from '../components/Spinner'
import { Rateing } from '../components/Rateing';
import '../components/ProductPage.css';
import { QuantityBox } from '../components/QuantityBox';
import { LiaShippingFastSolid  } from "react-icons/lia";
import { FaHandshake } from "react-icons/fa";
import { RelatedProducts } from '../components/RelatedProducts';



export const ProductPage = () => {
  const {fetchProducts , products , loading , setLoading , setdrawer , cartItems , setCartItems ,drawerOpen  , cartBox} = useContext(AppContext);
    const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [quantitybox, setQuantity] = useState(1);
  const [formData , setFormData] = useState({ id:id , quantity:quantitybox})
  const [mainImage, setMainImage] = useState("");
  const [readMore , setReadMore] = useState(false);
  const [realtedItem , setRealtedItem] = useState([]);
  const category = products?.category;
  const description = readMore
  ? products?.description
  : products?.description?.substring(0, 100);
  useEffect(() => {
    if (products?.images?.length > 0) {
      setMainImage(products.images[0]);
    }
  }, [products]);


 
  useEffect(() => {
    if (location.pathname.includes("product")){
      fetchProducts(`product/${id}`);
    }
  }, [location.pathname])


     // realted product 

  async function fetchRelatedProduct() {
    setLoading(true);
    try{
      const res = await fetch(`https://dummyjson.com/products/category/${category}?limit=5`);
      console.log(res , 'RES');
      const data = await res.json();
      setRealtedItem(data.products);
    }
    catch(error){
       console.log(error)
    }finally {
    setLoading(false);
  }
}

  useEffect(() =>{
     if (category) {
          fetchRelatedProduct();
     }
  },[category])

  useEffect(() => {
      const data = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(data);
  }, [drawerOpen , location.pathname]);
  // realted product end

    function handleAtoCart(event){
    event.preventDefault();
     const {name , value , type} = event.target;
     setFormData((prev) => ({
       ...prev,
       [name]: value
     }
     ))
     setLoading(true);
    console.log(formData , 'sdfds');

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
        userId: 1,
        products: [
          {
            id: formData.id,
            quantity: quantitybox
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
    <div className='product-template'>
      <div className='page-width'>
        <div className='pdp-wrapper'>
        <div className='media-wrapper'>
        <div className="thumbnail_images">
          {products.images?.map((img, index) => (
            <img key={index} src={img} alt="thumb" onClick={() => setMainImage(img) } className={mainImage == img ? 'activeImg' : ''}  />
          ))}
        </div>
        <div className="main_image">
          <img src={mainImage} alt={products.title} />
        </div>
        </div>
        <div className='product_info' >
            <Rateing rating={products.rating} />
            <h2 className='product_title'>{products.title}</h2>
            <h4 className="product_price">${products.price}</h4>
            <div className='product-desc'>
             <h5>Description</h5>
             {description}
             <span className='readmore_text' onClick={() => setReadMore(prev => !prev) } >
              { readMore ? 'Less more' : 'Read more'}
             </span>
            </div>
            < QuantityBox quantitybox={quantitybox} setQuantity={setQuantity} />

             <form onSubmit={handleAtoCart}>
                <input type='hidden' name='quantity' value={formData.quantity} />
                <input type='hidden' name='id'  value={formData.id} />
                <button className='add-to-cart' id='atcbtn'> {loading ? (<Spinner/>) : ('Add to Cart')} </button>
             </form>

             <div className='shipping_details'>
              <div className='deatils-ship'>
                <LiaShippingFastSolid fontSize={30} /> <span>  {products.shippingInformation} </span>
              </div>
              <div className='deatils-ship'>
                <FaHandshake fontSize={30} /> <span> {products.warrantyInformation} </span>
              </div>
             </div>
        </div>
        </div>

        <RelatedProducts realtedItem={realtedItem} loading={loading} main_id={id} />
      </div>
    </div>
  )
}
