import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import './Search.css'
import { IoCloseOutline } from "react-icons/io5";
import { Card } from './Card';
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


export const Search = ({openSearch , setSearchOpen}) => {
  const navigate = useNavigate();
  const [query , setQuery] = useState('');
  const [results , setResults] = useState([]);

  const fetchResults = async (value) => {
    if(!value) return;

    const res = await fetch(`https://dummyjson.com/products/search?q=${value}&limit=5`);
    const data = await res.json();

    console.log(data, 'data is');
    setResults(data.products);


  }

  useEffect(() => {
    const timer = setTimeout(() => {
        fetchResults(query);
    },500)

    return () => clearTimeout(timer)
  },[query]);
  return (
     <div className={`predictive_search ${openSearch ? 'open' : ''}`}>
        <div className='search_box_main'>
        <div className='search_box'>
         <input type='text' placeholder='Enter you Query' onChange={(e) => setQuery(e.target.value)} />
         <button className='search_icon'><IoSearchOutline/></button>
        </div>
        <IoCloseOutline fontSize={'2rem'} onClick={() => setSearchOpen(false)} className='icon_close' />
        </div>
        {results.length > 0 ? 
        
    
    
        <div className='search_results'>
          {results.length > 0 ?  <h3>Products</h3> : ''}
         
          <div className='grid grid-four-item'>

          {results.map( (item , index) => <Card product={item}/> )}
          </div>
          {results.length > 0 ? <div className='moreItems' onClick={() => 
            { 
                navigate('products');
                setSearchOpen(false);
            }}
            >
            More Products<FaArrowRightLong/></div> : ''}
          
        </div> : ''
    }
    </div>
  )
}
