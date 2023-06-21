import React, { useContext, useEffect, useState } from 'react';
import { userData } from '../../../hook/useUser';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import useAdmin from '../../../hook/useAdmin';
import axios from 'axios';
import useInstructor from '../../../hook/useInsinstructor';
import MgUserRow from './MgUserRow';
import { useQuery } from 'react-query';
import { FaBeer, FaChessKing, FaChessRook } from 'react-icons/fa';
import useAxiosSecure from '../../../hook/useAxiosSecure';
const ManageUsers = () => {
  const { user, loading } = useContext(AuthContext);
  const users = userData(user);
  console.log(users);
  //   const[allUsers,setAllUsers]=useState([])
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  console.log(isInstructor);
  console.log(isAdmin);
  const [axiosSecure] = useAxiosSecure();

  const { data: allUsers = [], refetch } = useQuery(['allUsers'], async () => {
    const res = await axiosSecure.get('/admin/users');
    return res.data;
  });

  const [role, setRole] = useState('student');

  const userRoleBtn = (id) => {
    console.log('status');
    console.log(id);
    console.log(role);

    fetch(`https://assignment-server-site-gold.vercel.app/user/${id}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: role }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
        }
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAdmin = (user) => {
    fetch(
      `https://assignment-server-site-gold.vercel.app/users/admin/${user._id}`,
      {
        method: 'PATCH',
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (data.modifiedCount) {
          refetch();
        }
      });
  };
  const handleInstructors = (user) => {
    console.log('firstand not');
    fetch(
      `https://assignment-server-site-gold.vercel.app/users/instructor/${user._id}`,
      {
        method: 'PATCH',
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (data.modifiedCount) {
          refetch();
        }
      });
  };

  return (
    <div>
      <div className="border border-red-500">
        <h1 className="text-center text-3xl font-semibold m-5">Manage Users</h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <label>#</label>
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>email</th>
                <th>Role</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, index) => (
                <tr>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={user.userImage}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{user.name}</div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <th>
                    {user.role == 'admin' ? (
                      'admin'
                    ) : (
                      <button
                        onClick={() => handleAdmin(user)}
                        className="btn  bg-orange-500 text-white"
                      >
                        <FaChessKing
                          className="text-black"
                          title="Admin"
                        ></FaChessKing>
                      </button>
                    )}
                  </th>
                  <th>
                    {user.role == 'instructor' ? (
                      'Instructor'
                    ) : (
                      <button
                        onClick={() => handleInstructors(user)}
                        className="btn  bg-orange-500 text-white"
                      >
                        <FaChessRook
                          className="text-black"
                          title="Instructor"
                        ></FaChessRook>
                      </button>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
