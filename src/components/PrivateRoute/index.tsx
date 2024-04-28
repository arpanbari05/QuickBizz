import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserContext } from "../../App";

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
  const { userId } = useContext(UserContext);

  const renderRoute = () => {
    if (!userId) {
      return <Navigate to="/login" />;
    } else {
      return <Route path={path} element={element} />;
    }
  };

  return renderRoute();
};

export default PrivateRoute;
