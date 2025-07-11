import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import DashboardUserLayout from "./dashboardUserLayout";
import DashboardDoctorLayout from "./dashboardDoctorLayout";

const RoleBasedLayout: React.FC = () => {
  const role = localStorage.getItem("role");
  const location = useLocation();

  if (role === "doctor") {
    return <DashboardDoctorLayout />;
  }

  if (role === "user") {
    return <DashboardUserLayout />;
  }

  return <Navigate to="/" replace state={{ from: location }} />;
};

export default RoleBasedLayout;