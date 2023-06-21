import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const MyEnrolled = () => {
  const [myenrolled, setMyEnrolled] = useState([]);
const[axiosSecure]=useAxiosSecure()
const{user}=useContext(AuthContext)
  useEffect(() => {
    axiosSecure.get(`/enrolledclass/${user?.email}`).then((res) => {
      console.log(res.data);
      setMyEnrolled(res.data);
    });
  }, []);

  return (
    <>
      <div>
        <h1 className="text-center font-semibold text-3xl uppercase text-red-500">
          my enrolled class
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {myenrolled.map((enroll) => (
          <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure>
              <img
                src={enroll.classImage}
                alt="class"
              />
            </figure>
            <div className="card-body">
              <div className="card-title justify-around">
                <div>{enroll.className}!</div>
                <div>
                  <div className="badge badge-success gap-2 p-5">Enrolled</div>
                </div>
              </div>
              <p className='font-semibold  text-xl ml-8' ><span >Price:</span>{enroll.price}</p>
              <p className='font-semibold  text-xl ml-8' ><span >Instructor Name:</span>{enroll.instructorName}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyEnrolled;
