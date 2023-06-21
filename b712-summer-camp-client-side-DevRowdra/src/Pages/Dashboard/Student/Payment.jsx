import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from '../../../Component/CheckoutFrom/CheckoutForm';

const Payment = () => {
    const payClass=useLoaderData()
    const{instructorName,price,className,classImage}=payClass
    console.log(payClass)
    const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_KEY}`);
    // console.log(import.meta.env.VITE_PAYMENT_KEY)
    return (
        <div>
            <div className='text-center'>
                <h1 className='text-3xl font-semibold '>< >Class Name:</> {className}</h1>
                <h1 className='text-3xl font-semibold '>< >Instructor Name:</> :{instructorName}</h1>
                <h1 className='text-3xl font-semibold '><>Price:</> {price}$</h1>
            </div>
            <div className='w-96 border border-black'>
                <Elements stripe={stripePromise}>

                    <CheckoutForm payClass={payClass}></CheckoutForm>
                </Elements>

            </div>
        </div>
    );
};

export default Payment;