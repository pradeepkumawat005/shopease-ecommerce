import React from 'react'
import { SlideShow } from '../components/SlideShow';
import { FeaturedCollections } from '../components/FeaturedCollections';
import {productUrl} from '../baseUrl';


export const Home = () => {
  return (
    <div>
        <SlideShow />
        <FeaturedCollections productUrl={productUrl} />
      
    </div>
  )
}
