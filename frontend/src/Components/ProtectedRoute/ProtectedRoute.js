import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed, redirectedPath, children }) => {
    if(!isAllowed) {
        return <Navigate to={redirectedPath} replace />
    }

    return (
        <>
            {children || <Outlet/>}
        </>
    );
};

export default ProtectedRoute;