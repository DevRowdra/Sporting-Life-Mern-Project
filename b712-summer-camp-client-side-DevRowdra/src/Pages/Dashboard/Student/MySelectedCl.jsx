import axios from 'axios';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { FaBeer, FaMoneyCheckAlt, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
const MySelectedCl = () => {
  const{user}=useContext(AuthContext)
  const [axiosSecure] = useAxiosSecure();
  const { data: allClasses = [], refetch } = useQuery(
    ['allClasses'],
    async () => {
      const res = await axiosSecure.get(`/bookedClass/${user.email}`);
      return res.data;
    }
  );
  const handleDelete = (id) => {
    console.log(id);
    fetch(
      `https://assignment-server-site-gold.vercel.app/deleteBookedClass/${id}`,
      {
        method: 'DELETE',
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your Class has been Deleted',
            showConfirmButton: false,
            timer: 1500
          })
        }
        console.log(data);
      });
  };
  console.log(allClasses);
  return (
    <div>
      <div>
        <h1 className="text-center font-semibold m-5 text-3xl">
          My All Booked Class
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
                <th>Class Name</th>
                <th>Instructors Email</th>
                <th>Delete</th>
                <th>PayMent</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {allClasses.map((classes, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={classes.classImage}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{classes.className}</div>
                  </td>
                  <td>{classes.instructorName}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(classes._id)}
                      className="btn btn-warning"
                    >
                      Delete<FaTrashAlt></FaTrashAlt>
                    </button>
                  </td>
                  <td>
                    <Link to={`/dashboard/studentpay/${classes._id}`}>
                      <button className="btn btn-warning">
                        Pay Now<FaMoneyCheckAlt> </FaMoneyCheckAlt>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MySelectedCl;
