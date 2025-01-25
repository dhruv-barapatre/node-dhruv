import React from 'react'
import { Navigate } from 'react-router';

const Private = ({children}) => {
const token=localStorage.getItem('token');
if(token){
    return children;
}
else{
    return <Navigate to="/login"/>
}
  
}

export default Private
