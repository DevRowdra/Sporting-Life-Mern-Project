import React from 'react';

const InstructorsTable = ({instructors,index}) => {
    const{name,email,userImage}=instructors
    return (
        <tr>
        <th>
         {index+1}
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={userImage} />
              </div>
            </div>
            
          </div>
        </td>
        <td>
         {name}
         
        </td>
        <td>{email}</td>
       
      </tr>
    );
};

export default InstructorsTable;