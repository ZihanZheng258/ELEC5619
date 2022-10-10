import { Navigate, useLocation } from "react-router";
import moment from "moment";

const RouteGuard: React.FC<{ children: JSX.Element }> = ({ children }) => {
    function hasJWT() {
        let flag = false;
        moment.suppressDeprecationWarnings = true;
        localStorage.getItem("token") ? flag = true : flag = false
        const current = moment();
        if (current.isAfter(localStorage.getItem('expire'))){
            localStorage.removeItem("token")
            return false
        }
        //check user has JWT token

        return flag
    }
    let location = useLocation();
    if (!hasJWT()) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
};
export default RouteGuard