import React from 'react';
import {Swiper , SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {slidesData} from '../baseUrl'
import '../components/SlideShow.css'

export const SlideShow = () => {
  return (
    <div className='slideshow-section'>
          <Swiper spaceBetween={0} slidesPerView={1}>
            {slidesData.map((slide) => (
               <SwiperSlide>
                <div className='slide-image-wrapper'>
                   <img src={slide.image} loading='eager'  /> 
                </div>
                <div className='slide-content-wrapper page-width' >
                    <h2 className='slide-heading'>{slide.heading}</h2>
                    <p className='slide-content'>{slide.content}</p>
                    <button className='primary-btn'>{slide.buttonText}</button>
                </div>
               </SwiperSlide>
            ))}
          </Swiper>
    </div>
  )
}
