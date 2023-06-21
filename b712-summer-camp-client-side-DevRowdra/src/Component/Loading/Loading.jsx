import React from 'react';
import Lottie from "lottie-react";
import LoadingAni from '../../assets/loading-animation.json'
const Loading = () => {
    return (
        <div>
            <Lottie className='h-64  mx-auto'  animationData={LoadingAni} loop={true} ></Lottie>
        </div>
    );
};

export default Loading;