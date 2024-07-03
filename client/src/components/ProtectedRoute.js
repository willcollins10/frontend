import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  console.log('ProtectedRoute: user is', user);
  return user ? element : <Navigate to="/landing" />;
};

export default ProtectedRoute;
