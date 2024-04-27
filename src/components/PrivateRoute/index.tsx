import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
  const user = localStorage.getItem("user");

  const renderRoute = () => {
    if (!user) {
      return <Navigate to="/login" />;
    } else {
      return <Route path={path} element={element} />;
    }
  };

  return renderRoute();
};

export default PrivateRoute;
