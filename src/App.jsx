import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import LeaveRequests from "./pages/LeaveRequests";
import Payroll from "./pages/Payroll";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";
import LeaveRequestForm from "./components/LeaveRequestForm";
import Profile from "./pages/Profile";
import Attendance from "./pages/Attendance";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

function AppContent() {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />
        <Box sx={{ flexGrow: 1, p: 3, bgcolor: "#f5f5f5", overflow: "auto" }}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute
                  allowedRoles={["Admin", "HR Manager", "Employee"]}
                >
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/employees"
              element={
                <PrivateRoute allowedRoles={["Admin", "HR Manager"]}>
                  <Employees />
                </PrivateRoute>
              }
            />
            <Route
              path="/leave-requests"
              element={
                <PrivateRoute allowedRoles={["Admin", "HR Manager"]}>
                  <LeaveRequests />
                </PrivateRoute>
              }
            />
            <Route
              path="/leave-request"
              element={
                <PrivateRoute allowedRoles={["Employee"]}>
                  <LeaveRequestForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/payroll"
              element={
                <PrivateRoute allowedRoles={["Admin", "HR Manager"]}>
                  <Payroll />
                </PrivateRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <PrivateRoute allowedRoles={["Admin", "HR Manager"]}>
                  <Attendance />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute
                  allowedRoles={["Admin", "HR Manager", "Employee"]}
                >
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Router basename="/FIP-T12025-Final-Hands-on-Project/">
      <AppContent />
    </Router>
  );
}

export default App;
