import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AllClassesCart from './AllClassesCart';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../hook/useAxiosSecure';

const ManageClasses = () => {
  // const[allClasses,setAllClasses]=useState([])
  // const[reRan,setReRan]=useState(false)

  // useEffect(()=>{
  //     axios.get('https://assignment-server-site-gold.vercel.app/allclasses')
  //     .then(res => {
  //       console.log(res.data)
  //       setAllClasses(res.data)
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     });
  // },[])
  // console.log(allClasses)
  const [axiosSecure] = useAxiosSecure();
  // TODO change  https://assignment-server-site-gold.vercel.app/allclasses to https://assignment-server-site-gold.vercel.app/admin/allclasses server also.

  const { data: allClasses = [], refetch } = useQuery(
    ['allclasses'],
    async () => {
      const res = await axiosSecure.get('/admin/allclasses');
      return res.data;
    }
  );

  const [status, setStatus] = useState('');

  const approveBtn = (id) => {
    console.log(status);
    console.log(id);

    fetch(`https://assignment-server-site-gold.vercel.app/class/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: status }),
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
  return (
    <div>
      <div className="text-4xl font-semibold text-black text-center m-7 border border-red-500">
        <h1>Manage Classes</h1>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {allClasses.map((allClass) => (
          <AllClassesCart
            allClass={allClass}
            approveBtn={approveBtn}
            setStatus={setStatus}
          ></AllClassesCart>
        ))}
      </div>
    </div>
  );
};

export default ManageClasses;
