import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../hook/useAdmin";
import Loading from "../../Component/Loading/Loading";

const AdminPrivateRoute = ({children}) => {
    
const{user,loading}=useContext(AuthContext)
const location=useLocation()
const [isAdmin,isAdminLoading] = useAdmin();

console.log(location)
if (loading || isAdminLoading) {
    return <Loading></Loading>
}
if (user && isAdmin) {
    return children;
}



    return (
        <Navigate to={'/'} state={{from:location}} replace>
            
        </Navigate>
    );
};

export default AdminPrivateRoute;