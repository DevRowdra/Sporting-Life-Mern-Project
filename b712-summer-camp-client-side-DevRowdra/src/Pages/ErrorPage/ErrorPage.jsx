
import { Link, useRouteError } from 'react-router-dom';
// import errorpicture from '../../assets/3828541.jpg'
import Lottie from "lottie-react";
import ErrorPageImg from '../../assets/18.json'
const ErrorPage = () => {
    const {status,data} = useRouteError();
   
    console.log(status,data)
    return (
        <div>
        <div  >
       <Lottie className='h-64  mx-auto'  animationData={ErrorPageImg} loop={true} ></Lottie>
       
        </div>
        <div className='text-center'>
        <h1 className='text-8xl text-orange-600'>{status}</h1>
        <p className='text-4xl'> {data}</p>
       <Link to={'/'}> <button className="btn btn-success mt-5">Back to Home</button></Link>
        </div>
    </div>
    );
};

export default ErrorPage;