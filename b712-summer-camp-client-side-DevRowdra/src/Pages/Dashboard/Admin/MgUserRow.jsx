import React from 'react';

const MgUserRow = ({index,user,setRole,userRoleBtn}) => {
    const{userImage,name,role,email,_id}=user
    return (
        <tr>
        <th>
          <label>
           {index+1}
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={userImage} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            
          </div>
        </td>
        <td>
        <div className="font-bold">{name}</div>
        
        </td>
        <td>
         {email}
        
        </td>
        <td>{role}</td>
        <th>
          <button className="btn btn-warning" onClick={()=>{userRoleBtn(_id);setRole('admin')}} >Make Admin</button>
        </th>
        <th>
          <button className="btn btn-warning" onClick={()=>{userRoleBtn(_id); setRole('instructor')}} >Make Instructor</button>
        </th>
      </tr>
    );
};

export default MgUserRow;