// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
//
// const RouteGuard = ({ component: Component, ...rest }) => {
//
//     function hasJWT() {
//         let flag = false;
//
//         //check user has JWT token
//         localStorage.getItem("token") ? flag=true : flag=false
//
//         return flag
//     }
//
//     return (
//         <Route {...rest}
//                render={props => (
//                    hasJWT() ?
//                        <Component {...props} />
//                        :
//                        <Navigate to= '/login'  />
//                )}
//         />
//     );
// };
//
// export default RouteGuard;

import { Navigate, useLocation } from "react-router";

const RouteGuard: React.FC<{ children: JSX.Element }> = ({ children }) => {
    function hasJWT() {
        let flag = false;

        //check user has JWT token
        localStorage.getItem("token") ? flag = true : flag = false

        return flag
    }
    let location = useLocation();
    if (!hasJWT()) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
};
export default RouteGuard