import React, { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../context';

const ProtectedRoute = () => {
    const [state] = useContext(UserContext)
    if(state.loading) return <div style={{width: "100%", display:"flex", justifyContent: "center"}}>
        <Spinner animation="border"/>
    </div> 
    // outlet is reference to children component
    return state.data ? <Outlet/> : <Navigate to={"/"}/>;
};

export default ProtectedRoute;
