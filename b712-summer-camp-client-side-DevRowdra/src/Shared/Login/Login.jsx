import Lottie from "lottie-react";
import LoginImg from '../../assets/login.json'
import { useForm } from "react-hook-form";
import { FaEye } from 'react-icons/fa';

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
const Login = () => {
const[show,setShow]=useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const{logIn}=useContext(AuthContext)
    const location=useLocation()
    const navigate=useNavigate()
    const forms=location.state?.from?.pathname || '/'
    const onSubmit = data =>{ 
      console.log(data)
    
    logIn(data.email,data.password)
    .then(result=>{
      const user=result.user
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User Login Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      navigate(forms,{replace:true})
      console.log(user)
    })
    .catch(error=>{
      console.log(error.message)
    })
    
    
    
    
    };
    return (
        <>
            
        <div className=" min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <Lottie className='  '  animationData={LoginImg} loop={true} ></Lottie>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h1 className="text-5xl text-center  font-bold">Login now!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
                {errors.email && <span className="text-red-500">Please Enter Email</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                  <FaEye onClick={()=>setShow(!show)} className="cursor-pointer"></FaEye>
                </label>
                <input type={show?"text":'password'} placeholder="password" className="input input-bordered" {...register("password", { required: true,pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,})}/>
               
                {errors.password?.type === 'required' && (
                  <p>password must be 6 characters</p>
                )}
                {errors.password?.type === 'pattern' && (
                  <p>
                    password must have one capital letter one number and one
                    small letter
                  </p>
                )}

              </div>
              <p>New in this site <Link to={'/singup'}>Register now</Link></p>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <GoogleLogin forms={forms}></GoogleLogin>
            </form>
          </div>
        </div>
      </div>
        </>
    );
};

export default Login;