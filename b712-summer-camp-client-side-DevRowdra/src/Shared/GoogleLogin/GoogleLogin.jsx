import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { userDataSave } from '../../hook/useAuth';

const GoogleLogin = ({forms}) => {
    const {loginWithGoogle}=useContext(AuthContext)
    const navigate=useNavigate()
  
  const googleProvider = new GoogleAuthProvider();
      const handleGoogleLogin=()=>{
           loginWithGoogle(googleProvider)
           .then(result=>{
              const userCr=result.user
              console.log(userCr)
              userDataSave(userCr)
              navigate(forms || { replace: true })
           })
           .catch(error=>{
              console.log(error.message)
           })
      }

  return (
   <div className='text-center mt-5  text-2xl'>
     <button onClick={handleGoogleLogin} className="btn btn-circle btn-outline">
     <h1 title='Google Login' className='text-3xl font-mono'>G</h1>
    </button>
   </div>
  );
};

export default GoogleLogin;
