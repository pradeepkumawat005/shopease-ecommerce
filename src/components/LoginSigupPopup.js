import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import popupImage from '../assets/popup.jpg'
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

export const LoginSigupPopup = ({showModal , setShowModal , setIsLogedIn}) => {

 const [isLogin , setIsLogin ] = useState(false);
 const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div className='singup-modal ' data={showModal ? 'true' : 'false'}>
        <button id="closeModal" onClick={() => setShowModal(false)} ><IoCloseOutline /></button>
        <div className='modal-main'>
            <div className='modal-image-wrapper'>
                {!imgLoaded && <div className="image-skeleton"></div>}
    
  <img
    src={popupImage}
    loading="eager"
    onLoad={() => setImgLoaded(true)}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: imgLoaded ? "block" : "none"
    }}
  />

            </div>
            <div className='modal-form-wrapper'>
               <div className='modal-inner-wrraper'>
                  <div className='modal-swatch-btn'>
                    <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}   >
                        Login
                    </button>
                    <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}   >
                        Sign Up
                    </button>
                  </div>
                  <div className='modal-form' >
                    {isLogin ? (<LoginForm setIsLogedIn={setIsLogedIn} setShowModal={setShowModal} />) : (<SignUpForm setIsLogedIn={setIsLogedIn} setShowModal={setShowModal}/>)}
                  </div>
               </div>
            </div>
        </div>
    </div>
  )
}
