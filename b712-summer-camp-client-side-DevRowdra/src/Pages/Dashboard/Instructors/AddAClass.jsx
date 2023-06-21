import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddAClass = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useContext(AuthContext);
  console.log(user);
  const imgkey = import.meta.env.VITE_IMGKEY;
  console.log(imgkey);
  const imageHostLink = `https://api.imgbb.com/1/upload?key=${imgkey}`;
  const onSubmit = (data) => {
    const file = data.classImage[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch(imageHostLink, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((imageResponse) => {
        console.log('imageLink', imageResponse);
        if (imageResponse.success) {
          const imageLink = imageResponse.data.display_url;
          const {
            className,
            availableSeats,
            price,
            instructorName,
            instructorEmail,
          } = data;
          const newClass = {
            className,
            instructorName,
            instructorEmail,
            price: parseFloat(price),
            availableSeats: parseFloat(availableSeats),
            classImage: imageLink,
            status: 'pending',
            totalEnroll: 0,
          };
          console.log(newClass);
          axios
            .post(
              'https://assignment-server-site-gold.vercel.app/addclasses',
              newClass
            )
            .then((res) => {
              console.log(res.data);
              if (res.data.insertedId) {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Class added Successfully',
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            })
            .catch((error) => {
              console.error(error);
            });

          reset();
        }
      })
      .catch((error) => {
        console.error('Image upload error:', error);
      });
  };
  //   console.log(import.meta.env.VITE_IMGKEY);
  return (
    <div>
      <div className="text-4xl font-semibold text-black text-center m-7 border border-red-500">
        {' '}
        Add A Class
      </div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-sm mx-auto"
        >
          <div className="mb-4">
            <label
              htmlFor="className"
              className="block mb-2 font-bold text-gray-700"
            >
              Class Name
            </label>
            <input
              type="text"
              id="classname"
              name="className"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('className', { required: true })}
            />
            {errors.className && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="classImage"
              className="block mb-2 font-bold text-gray-700"
            >
              Class Image
            </label>
            <input
              type="file"
              id="classImage"
              name="classImage"
              {...register('classImage', { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.classImage && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="instructorName"
              className="block mb-2 font-bold text-gray-700"
            >
              Instructor Name
            </label>
            <input
              type="text"
              id="instructorName"
              name="instructorName"
              //   TODO
              value={user?.displayName}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              {...register('instructorName', { required: true })}
            />
            {errors.instructorName && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="instructorEmail"
              className="block mb-2 font-bold text-gray-700"
            >
              Instructor Email
            </label>
            <input
              type="email"
              id="instructorEmail"
              name="instructorEmail"
              //   TODO
              value={user?.email}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              {...register('instructorEmail', { required: true })}
            />
            {errors.instructorEmail && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="availableSeats"
              className="block mb-2 font-bold text-gray-700"
            >
              Available Seats
            </label>
            <input
              type="number"
              id="availableSeats"
              name="availableSeats"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('availableSeats', { required: true })}
            />
            {errors.availableSeats && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block mb-2 font-bold text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('price', { required: true })}
            />
            {errors.price && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAClass;
