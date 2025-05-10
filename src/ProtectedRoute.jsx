import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const studentId = localStorage.getItem("studentId");

  if (!studentId || studentId === "null") {
    console.log("Redirecting: No studentId found.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
