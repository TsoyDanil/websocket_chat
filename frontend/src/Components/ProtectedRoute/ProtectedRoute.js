import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = (props) => {
    if(!props.isAllowed) {
        return <Navigate to={props.redirectedPath} replace />
    }

    return (
        <>
            {props.children || <Outlet/>}
        </>
    );
};

export default ProtectedRoute;