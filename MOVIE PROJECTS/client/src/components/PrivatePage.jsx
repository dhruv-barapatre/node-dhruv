import React from 'react'
import {Navigate} from "react-router"

const PrivatePage = ({ children }) => {
    const Token = localStorage.getItem('Token');
    if (Token) {
        return children;
    }
    else {
        return <Navigate to="/login" replace={true} />
    }

}

export default PrivatePage
