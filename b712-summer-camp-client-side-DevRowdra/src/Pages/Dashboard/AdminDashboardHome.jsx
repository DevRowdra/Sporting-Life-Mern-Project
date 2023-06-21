import React from 'react';
import Lottie from "lottie-react";
import dashboard from '../../assets/dashboard-animation.json'
const AdminDashboardHome = () => {
    return (
        <div>
            <h1 className='text-center font-semibold mt-7 text-6xl uppercase'>welcome to Dashboard</h1>
           <Lottie className='h-[600px]  mx-auto'  animationData={dashboard} loop={true} ></Lottie>
        </div>
    );
};

export default AdminDashboardHome;