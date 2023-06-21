import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddFeedBack = () => {
  const clasS = useLoaderData();
  console.log(clasS);
  const { _id } = clasS;
  const navigate = useNavigate();
  const addFeedBack = (e) => {
    console.log(_id);
    e.preventDefault();
    const form = e.target;
    const feedback = form.feedback.value;
    const newFeedBack = {
      feedback,
    };
    console.log(newFeedBack);
    fetch(`https://assignment-server-site-gold.vercel.app/class/${_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newFeedBack),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Admin FeedBack Added',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(-1);
      });
  };
  return (
    <div>
      <h1 className="text-center font-semibold text-3xl m-3">
        Add You Feedback
      </h1>
      <div>
        <form onSubmit={addFeedBack}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Class FeedBack
            </label>
            <textarea
              rows="4"
              cols="50"
              id="name"
              name="feedback"
              placeholder="Enter feedback"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          {/* Continue with the remaining form fields */}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Add FeedBack
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFeedBack;
