import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import SingleClass from './SingleClass';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { userData } from '../../hook/useUser';
import useStudent from '../../hook/useStudent';

const ClassesPage = () => {
  const [allClasses, setAllClasses] = useState([]);
  const { user } = useContext(AuthContext);
  const [isStudent] = useStudent();
  console.log(isStudent);
  const users = userData(user);
  console.log(users);
  const amDisabled = users?.role == 'admin' || users?.role == 'instructor';
  console.log(amDisabled);
  useEffect(() => {
    axios
      .get('https://assignment-server-site-gold.vercel.app/approveClasses')
      .then((res) => {
        console.log(res.data);
        setAllClasses(res.data);
      });
  }, []);
  console.log(allClasses);
  return (
    <div>
      <div>
        <h1 className="text-center font-semibold text-3xl m-4">All Classes</h1>
      </div>
      <div className="grid grid-cols-3 gap-3 ">
        {allClasses.map((clasS) => (
          <SingleClass
            amDisabled={amDisabled}
            clasS={clasS}
          ></SingleClass>
        ))}
      </div>
    </div>
  );
};

export default ClassesPage;
