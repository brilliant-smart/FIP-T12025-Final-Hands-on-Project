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
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import "./App.css";

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
    <>
      <Navbar />
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* Sidebar */}
        <Sidebar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1, // Main content area grows to take available space
            padding: 3,
            overflow: "hidden", // Handles overflowing content
            marginLeft: "250px", // Sidebar width fixed to 250px
          }}
        >
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
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

function App() {
  return (
    <Router>
      <CssBaseline /> {/* Apply default MUI styles */}
      <AppContent />
    </Router>
  );
}

export default App;
