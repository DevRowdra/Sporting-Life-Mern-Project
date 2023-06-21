import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { JackInTheBox } from 'react-awesome-reveal';

const PopularInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    axios
      .get('https://assignment-server-site-gold.vercel.app/topinstructors')
      .then((res) => {
        console.log(res.data);
        setInstructors(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <JackInTheBox>
        <h1 className="text-center font-semibold text-3xl text-black m-10">
          Popular Instructors{' '}
        </h1>
      </JackInTheBox>

      <hr></hr>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {instructors.map((instructor) => (
          <div className="card card-compact w-96 h-[300px] bg-base-100 shadow-xl">
            <figure>
              <img
                src={instructor.instructorImage}
                alt="class"
              />
            </figure>
            <div className="card-body ">
              <p>
                <span className="font-semibold">Instructor name:</span>{' '}
                {instructor.instructorName}
              </p>
              <p>
                <span className="font-semibold">Instructor email:</span>{' '}
                {instructor.instructorEmail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularInstructors;
