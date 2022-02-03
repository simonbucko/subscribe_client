import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../context';

const ProtectedRoute = () => {
    const [state] = useContext(UserContext)
    console.log(state)
    if(state.loading) return <div>Loading...</div>
    // outlet is reference to children component
    return state.data ? <Outlet/> : <Navigate to={"/"}/>;
};

export default ProtectedRoute;
