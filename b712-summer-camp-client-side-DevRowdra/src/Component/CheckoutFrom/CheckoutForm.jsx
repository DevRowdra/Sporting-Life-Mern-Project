import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutFrom.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import axios from 'axios';
import { data } from 'autoprefixer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const CheckoutForm = ({ payClass }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const navigate = useNavigate();
  console.log(payClass);
  useEffect(() => {
    if (payClass?.price) {
      axios
        .post(
          'https://assignment-server-site-gold.vercel.app/create-payment-intent',
          {
            price: payClass?.price,
          }
        )
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [payClass]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setCardError(error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
    // payment confirm
    const { paymentIntent, error: confError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'unknown',
            email: user?.email || 'anonymous',
          },
        },
      }
    );

    if (confError) {
      console.log('[error]', confError);
      setCardError(confError.message);
    } else {
      console.log('[paymentIntent]', paymentIntent);
      if (paymentIntent.status == 'succeeded') {
        console.log(paymentIntent);
        const specificDate = new Date();
        const year = specificDate.getFullYear();
        const month = specificDate.getMonth() + 1;
        const day = specificDate.getDate();

        // Get the time components
        const hours = specificDate.getHours();
        const minutes = specificDate.getMinutes();
        const seconds = specificDate.getSeconds();

        const bookedInfo = {
          ...payClass,
          transactionId: paymentIntent.id,
          // date: { year, month, day },
          // time: { hours, minutes, seconds },
          date: new Date(),
        };
        console.log(bookedInfo);
        axios
          .post(
            'https://assignment-server-site-gold.vercel.app/enrllodClass',
            bookedInfo
          )
          .then((res) => {
            console.log(res.data);
            if (res.data.acknowledged == true) {
              console.log('data done');
              fetch(
                `https://assignment-server-site-gold.vercel.app/deleteBookedClass/${payClass._id}`,
                {
                  method: 'DELETE',
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  if (data.deletedCount > 0) {
                    fetch(
                      `https://assignment-server-site-gold.vercel.app/enroll/class/${payClass.classId}`,
                      {
                        method: 'PATCH',
                      }
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        console.log('work done fully');
                        if (data.modifiedCount > 0) {
                          Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Payment Confirm',
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          navigate(-1);
                        }
                        console.log(data);
                      });
                  }
                  console.log(data);
                });
            }
            // aie khan thaka ager data da delete korte hoba
          });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-warning"
          disabled={!stripe}
        >
          Pay {payClass.price} $
        </button>
      </form>
      {cardError && <p className="text-red-500 font-semibold">{cardError}</p>}
    </>
  );
};
export default CheckoutForm;
