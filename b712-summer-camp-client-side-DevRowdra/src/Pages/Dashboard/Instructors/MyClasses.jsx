import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const MyClasses = () => {
  const { user } = useContext(AuthContext);
  const [allClasses, setAllClasses] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://assignment-server-site-gold.vercel.app/instructorsclass/${user?.email}`
      )
      .then((res) => {
        console.log(res.data);
        setAllClasses(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);
  console.log(allClasses);
  return (
    <div>
      <div className="border border-red-500">
        <h1 className="text-center font-semibold text-black text-3xl uppercase m-16">
          my classes
        </h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>No of student</th>
                <th>status</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {allClasses.map((allClasse, index) => (
                <tr key={allClasse._id}>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={allClasse.classImage}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-bold">{allClasse.className}</div>
                    </div>
                  </td>
                  <td>{allClasse.price}</td>
                  <td>{allClasse.totalEnroll}</td>
                  <td>{allClasse.status}</td>
                  <td>{allClasse.feedback ? allClasse.feedback : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyClasses;
