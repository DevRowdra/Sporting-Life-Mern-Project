import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InstructorsTable from './InstructorsTable';

const InstructorsPage = () => {
  const [allInstructors, setAllinstructors] = useState([]);
  useEffect(() => {
    axios
      .get('https://assignment-server-site-gold.vercel.app/allinstructors')
      .then((res) => {
        console.log(res.data);
        setAllinstructors(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {allInstructors.map((instructors, index) => (
                <InstructorsTable
                  key={instructors._id}
                  index={index}
                  instructors={instructors}
                ></InstructorsTable>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InstructorsPage;
