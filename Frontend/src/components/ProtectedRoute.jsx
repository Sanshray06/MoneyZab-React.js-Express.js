import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no token is found, redirect to the login page
  if (!token) {
    return <Navigate to="/signin" />;
  }

  // Optionally, you can add logic here to verify the token with the server

  // If token is valid, render the children components (i.e., the protected route components)
  return children;
};

export default ProtectedRoute;
