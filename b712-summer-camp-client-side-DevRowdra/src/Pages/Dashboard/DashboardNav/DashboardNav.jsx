import React from 'react';
import { NavLink } from 'react-router-dom';
import useAdmin from '../../../hook/useAdmin';
import useInstructor from '../../../hook/useInsinstructor';
import useStudent from '../../../hook/useStudent';
import { FaAddressBook, FaAmazonPay, FaBookmark, FaDatabase, FaEdit, FaMoneyBillAlt, FaUsers } from 'react-icons/fa';

const DashboardNav = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [isStudent] = useStudent();
  // console.log(isInstructor);
  console.log(isStudent);
  const admin = (
    <>
      <div className="navbar-start">
        <p className=" normal-case text-xl">Admin Dashboard</p>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'bg-amber-400' : 'inactive'
              }
              to="/dashboard/manageuser"
            >
              <FaUsers></FaUsers>
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'bg-amber-400' : 'inactive'
              }
              to={'/dashboard/manageclasses'}
            >
              <FaEdit></FaEdit>
              Manage Classes
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
  const Student = (
    <>
      <div className="navbar-start">
        <p className=" normal-case text-xl">Student Dashboard</p>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'bg-amber-400' : 'inactive'
              }
              to={'/dashboard/myselectedclass'}
            >
              <FaBookmark></FaBookmark>
              My Selected Classes
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'bg-amber-400' : 'inactive'
              }
              to="/dashboard/myenrolledclass"
            >
              <FaAmazonPay></FaAmazonPay>
              My Enrolled Classes
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'bg-amber-400' : 'inactive'
              }
              to="/dashboard/paymenthistory"
            >
              <FaMoneyBillAlt></FaMoneyBillAlt>
              Payment History
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
  const Instructor = (
    <>
      <div className="navbar-start">
        <p className=" normal-case text-xl">Instructor Dashboard</p>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'bg-amber-400' : 'inactive'
              }
              to={'/dashboard/addaclass'}
            >
             <FaAddressBook></FaAddressBook>
              Add a Class
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'bg-amber-400' : 'inactive'
              }
              to="/dashboard/myclass"
            >
              <FaDatabase></FaDatabase>
              My Classes
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      {isAdmin ? admin : isInstructor ? Instructor : Student}
    </div>
  );
};

export default DashboardNav;
