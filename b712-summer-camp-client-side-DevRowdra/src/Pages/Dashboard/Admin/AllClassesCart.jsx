import React from 'react';
import { Link } from 'react-router-dom';

const AllClassesCart = ({allClass,approveBtn,setStatus}) => {
    const{_id,classImage,className,instructorName,instructorEmail,availableSeats,status,price}=allClass
   const isDisabled=status=== 'approve' || status == 'denied'
   console.log(isDisabled)
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={classImage} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{className}</h2>
    <p>Instructor Name: {instructorName}</p>
    <p>Instructor Email: {instructorEmail}</p>
    <p>Available Seats: {availableSeats}</p>
    <p>Status: {status}</p>
    <p>Price: {price}</p>
    <div className="card-actions gap-1">
      <button className="btn btn-primary" disabled={isDisabled} onClick={()=>{ approveBtn(_id); setStatus('approve'); }}>Approve</button>
      <button className="btn btn-primary" disabled={isDisabled}  onClick={()=>{ approveBtn(_id); setStatus('denied'); }}>Deny</button>
     <Link to={`/dashboard/addfeedback/${_id}`}> <button className="btn btn-primary">Send Feedback</button></Link>
    </div>
  </div>
</div>
    );
};

export default AllClassesCart;