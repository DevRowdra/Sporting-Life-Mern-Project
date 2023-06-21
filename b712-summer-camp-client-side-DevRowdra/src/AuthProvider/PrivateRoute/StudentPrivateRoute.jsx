import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useStudent from "../../hook/useStudent";
import Loading from "../../Component/Loading/Loading";

const StudentPrivateRoute = ({children}) => {
    
const{user,loading}=useContext(AuthContext)
const location=useLocation()
const [isStudent,isStudentLoading] = useStudent();

console.log(location)
if (loading || isStudentLoading) {
    return <Loading></Loading>
}
if (user && isStudent) {
    return children;
}



    return (
        <Navigate to={'/'} state={{from:location}} replace>
            
        </Navigate>
    );
};

export default StudentPrivateRoute;