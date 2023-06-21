import React from 'react';

const SingleCart = ({item}) => {
    const{className,classImage,price,totalEnroll,numberOfStudents,instructorName}=item;
    return (
        <div className="card card-compact w-96 h-[300px] bg-base-100 shadow-xl">
        <figure><img src={classImage} alt="class" /></figure>
        <div className="card-body">
          <h2 className="card-title">{className}</h2>
          <p><span className='font-semibold'>Instructor Name:</span> {instructorName}</p>
          <p><span className='font-semibold'>Number Of Students:</span> {totalEnroll}</p>
          <div className="card-actions justify-end">
          </div>
        </div>
      </div>
    );
};

export default SingleCart