import React from 'react';
import { IoStar , IoStarHalf } from "react-icons/io5";



export const Rateing = ({rating}) => {

  const rounded = Math.round(rating * 2) / 2;
  const fullStar = Math.floor(rounded);
  const halfStar = rounded % 1 !== 0;
  return (
    <div className='rating' >
       {fullStar && 
       [...Array(fullStar)].map((_, i) => (
          <IoStar fontSize={1.5} />
       ))
       }
       {
        halfStar &&
        <IoStarHalf fontSize={1.5} />
       }
    </div>
  )
}
