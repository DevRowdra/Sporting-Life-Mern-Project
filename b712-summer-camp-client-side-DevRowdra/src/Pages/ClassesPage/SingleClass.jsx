import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const SingleClass = ({ clasS, amDisabled }) => {
  const { price, instructorName, classImage, availableSeats, className } =
    clasS;
  const setChe = availableSeats <= 0;
  console.log(setChe);
  console.log(clasS);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleAddClass = (selClass) => {
    if (loading) {
      return <h1>loading.....</h1>;
    }
    console.log(selClass._id);
    if (user && user.email) {
      const addedClass = {
        classId: selClass._id,
        studentEmail: user.email,
        classImage,
        className,
        instructorName,
        price,
      };
      fetch('https://assignment-server-site-gold.vercel.app/bookedClass', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(addedClass),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.acknowledged) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your Class has been saved',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      console.log(addedClass);
    } else {
      navigate('/login');
    }
  };
  return (
    <div
      className={`card w-96 ${
        setChe ? 'bg-red-500' : 'bg-base-100'
      }  shadow-xl`}
    >
      <figure>
        <img
          className="h-[300px] w-[256]"
          src={classImage}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Class Name: {className}</h2>
        <p>
          <span className="font-semibold">Instructor Name:</span>{' '}
          {instructorName}
        </p>
        <p>
          <span className="font-semibold">Available Seats:</span>{' '}
          {availableSeats}
        </p>
        <p>
          <span className="font-semibold">Price:</span> {price}
        </p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-warning"
            onClick={() => handleAddClass(clasS)}
            disabled={amDisabled || setChe}
          >
            Booked Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleClass;
