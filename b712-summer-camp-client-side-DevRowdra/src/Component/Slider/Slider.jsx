import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import img1 from '../../assets/slider/f1.jpg'
import img2 from '../../assets/slider/f2.jpg'
import img3 from '../../assets/slider/f3.jpg'
import img4 from '../../assets/slider/f4.jpg'
import img5 from '../../assets/slider/f5.jpg'
import "./slider.css";
import { Slide } from 'react-awesome-reveal';

const Slider = () => {
    return (
       <div className=' flex justify-center items-center object-cover'>
        <Swiper className="mySwiper">
        <SwiperSlide>
            <>
            <img className='h-[] ' src={img5} alt="" />
            
            <h1 className='absolute top-10 text-7xl right-8 font-semibold text-white'>A good <span className='text-red-600'>kick</span> <br></br> in the Grass</h1>
            </>
        </SwiperSlide>
        <SwiperSlide> 
            <>
            <img  src={img2} alt="" />
        <h1 className='absolute top-10 text-7xl right-8 font-semibold text-white'>You are the <br></br> <span className='text-red-600'>Winner</span>  </h1>
            </>
        
        </SwiperSlide>
        <SwiperSlide>
            <>
            <img  src={img3} alt="" />
       
        <h1 className=' absolute top-10 text-7xl right-8 font-semibold text-white'>Eyes on the  <br></br> <span className='text-red-600'>Goal</span>  Sport</h1>
            </>
        </SwiperSlide>
        <SwiperSlide> <img  src={img4} alt="" />
        <h1 className='absolute top-10 text-7xl right-8 font-semibold text-white'>The only  <span className='text-red-600'>Limit</span> <br></br> is You</h1>
        </SwiperSlide>
       
      </Swiper>
       </div>
    );
};

export default Slider;