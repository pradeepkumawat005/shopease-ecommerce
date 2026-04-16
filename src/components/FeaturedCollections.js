

import React, { useContext, useEffect } from 'react';
import {featuredProduct} from '../baseUrl'
import { AppContext } from '../ContextApp/AppContext';

import { Card } from './Card';
import { NavLink } from 'react-router-dom';
import { Spinner } from './Spinner';
import { ProductSkeleton } from './ProductSkeleton';

export const FeaturedCollections = ({productUrl}) => {
  const {fetchProducts , products , loading } = useContext(AppContext);

useEffect(() => {
  fetchProducts(productUrl);
}, []);
  return (
    <div className='featured-main page-width' >
        <div className='flex'>
          <h2 className='title-main' >New Arrival</h2>
          <NavLink to='/collections' className='viewall-btn'>View All</NavLink>
          </div>
        <div className='featured-collections grid grid-four-item'>
        {
           loading ?  Array.from({ length: products.length }).map((_, index) => (   
                  <ProductSkeleton key={index} />
                )) : (  Array.isArray(products) && products.map((product) => (
      <Card key={product.id} product={product}/>
    )))     
        }
        </div>
    </div>
  )
}
