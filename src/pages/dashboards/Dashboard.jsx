import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import AdminDashboard from "./dashboards/AdminDashboard";
import HRDashboard from "./dashboards/HRDashboard";
import EmployeeDashboard from "./dashboards/EmployeeDashboard";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  if (!user) return null;

  switch (user.role) {
    case "Admin":
      return <AdminDashboard />;
    case "HR Manager":
      return <HRDashboard />;
    case "Employee":
      return <EmployeeDashboard />;
    default:
      return <div>Unauthorized Role</div>;
  }
};

export default Dashboard;
