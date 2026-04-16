import React, { useContext, useState } from 'react';
import Storelogo from '../assets/Storelogo.png';
import { NavLink } from 'react-router-dom';
import '../components/Header.css';
import { AppContext } from '../ContextApp/AppContext';
import { IoSearchOutline } from "react-icons/io5";

export const Header = ({isLogedIn , setShowModal, cartTotalItem , setSearchOpen}) => {
  const {setdrawer} = useContext(AppContext);
  return (
    <div className='header-wrapper'>
    <div className='page-width'>
    <header className='header'>
        <NavLink to='/' className='logo_box' >
            <span>Shop</span><span>Ease</span>
        </NavLink>
        <nav>
            <ul>
                <li> <NavLink to='/' >Home</NavLink> </li>
                <li> <NavLink to='/products'>Collections</NavLink> </li>
                <li> <NavLink to='/about-us'>About us</NavLink> </li>
                <li> <NavLink to='/contact-us'>Contact us</NavLink> </li>
            </ul>
        </nav>
        <div className='right-icon'>
           <span className='search_icon' onClick={() =>  setSearchOpen(true)}>
             <IoSearchOutline fontSize={'1.7rem'}/>
           </span>
           { isLogedIn ? (
            <NavLink to='/account' className='icon' >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                    </g><g id="SVGRepo_iconCarrier"> 
                        <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000"   stroke-linecap="round" stroke-linejoin="round">
                </path> </g>
                </svg>
            </NavLink>
           ) : (<NavLink to='#' className='icon' onClick={() => setShowModal(true) } >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                    </g><g id="SVGRepo_iconCarrier"> 
                        <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000"   stroke-linecap="round" stroke-linejoin="round">
                </path> </g>
                </svg>
            </NavLink >)

           }
           <NavLink to='#' className='icon cart' onClick={() => setdrawer(true)} >
             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
             <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
             <g id="SVGRepo_iconCarrier">
            <path d="M9 11V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V10.9673M10.4 21H13.6C15.8402 21 16.9603 21 17.816 20.564C18.5686 20.1805 19.1805 19.5686 19.564 18.816C20 17.9603 20 16.8402 20 14.6V12.2C20 11.0799 20 10.5198 19.782 10.092C19.5903 9.71569 19.2843 9.40973 18.908 9.21799C18.4802 9 17.9201 9 16.8 9H7.2C6.0799 9 5.51984 9 5.09202 9.21799C4.71569 9.40973 4.40973 9.71569 4.21799 10.092C4 10.5198 4 11.0799 4 12.2V14.6C4 16.8402 4 17.9603 4.43597 18.816C4.81947 19.5686 5.43139 20.1805 6.18404 20.564C7.03968 21 8.15979 21 10.4 21Z" stroke="#000000" stroke-linecap="round" stroke-linejoin="round">
            </path> </g>
            </svg>
            {cartTotalItem > 0 ? <span className='cartItem_count'>{cartTotalItem}</span> : '' }
            
           </NavLink>
        </div>
    </header>
    </div> 
    </div>
  )
}
