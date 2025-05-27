import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {currentuser} = useAuth();
    if (currentuser) {
        return children;
        
    }

    return  <Navigate to="/login" replace/>

  return (
    <div>
      
    </div>
  )
}

export default PrivateRoute
