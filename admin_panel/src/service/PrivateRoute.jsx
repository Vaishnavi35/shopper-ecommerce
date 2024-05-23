import React from 'react';
import { useAuth  } from './AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Login from '../common/Login';
import { LeftMenu } from '../common/LeftMenu';

export default function PrivateRoute() {
 const {loggedIn} = useAuth();

    if(!loggedIn){
        return <Navigate to="/login" />
    }else{
        return (
            <>
                <LeftMenu></LeftMenu>
                <Outlet />
            </>
            
        )
        
    }
}

