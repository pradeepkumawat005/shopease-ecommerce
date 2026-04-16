import React from 'react'
import { Spinner } from './Spinner'
import {Card} from '../components/Card'
import { NavLink } from 'react-router-dom'

export const RelatedProducts = ({realtedItem , loading , main_id}) => {
  const mainProductId = Number(main_id);
  return (
    <div className='related_products'>
       <div className='page-width'>
          <div className='flex'>
          <h2 className='title-main' >Related Products</h2>
          <NavLink to='/collections' className='viewall-btn'>View All</NavLink>
        </div>
          <div className='featured-collections grid grid-four-item'>
            {
                loading ? (
                    <Spinner />
                ) : (
                    Array.isArray(realtedItem) &&
                    realtedItem.map((product) =>
                    // console.log(product.id , main_id )
                    product.id !== mainProductId ? (
                        <Card key={product.id} product={product} />
                    ) : null
                    )
                )
            }
          </div>
       
       </div>
    </div>
  )
}
