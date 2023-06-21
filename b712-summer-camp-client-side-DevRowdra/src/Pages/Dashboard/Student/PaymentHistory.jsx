import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const PaymentHistory = () => {

const{user}=useContext(AuthContext)

const[history,setHistory]=useState([])
const[axiosSecure]=useAxiosSecure()
useEffect(()=>{
    axiosSecure.get(`/paymenthistoys/${user.email}`)
    .then(res=>{console.log(res.data)
    setHistory(res.data)
    
    })
},[])


  return (
    <>
      <div>
        <h1 className="text-5xl font-semibold uppercase text-center m-5">
          Payment History
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
                <th>TransactionId</th>
                <th>Date:Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                history.map((single,index)=><tr>
                <th>
                    {index+1}
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={single.classImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{single.className}</td>
                <td>{single.transactionId}</td>
                <td>{single.date}</td>
                <th>
                  <div className="badge badge-success gap-2">ENROLLED</div>
                </th>
              </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
