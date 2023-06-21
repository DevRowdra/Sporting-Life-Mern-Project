import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useInstructor from "../../hook/useInsinstructor";
import Loading from "../../Component/Loading/Loading";

const InstructorPrivateRoute = ({children}) => {
    
const{user,loading}=useContext(AuthContext)
const location=useLocation()
const [isInstructor,isInstructorLoading] = useInstructor();

console.log(location)
if (loading || isInstructorLoading) {
    return <Loading></Loading>
}
if (user && isInstructor) {
    return children;
}



    return (
        <Navigate to={'/'} state={{from:location}} replace>
            
        </Navigate>
    );
};

export default InstructorPrivateRoute;