import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router";



// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user, loading}= useContext(AuthContext);
    if(loading){
        return <span className="loading loading-infinity loading-xl"></span>
    }
    if(user){
    return children;
    }
    return <Navigate to="/login" state={location.pathname} replace={true}/>
};

export default PrivateRoute;