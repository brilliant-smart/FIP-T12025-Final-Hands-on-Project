import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid, Paper } from "@mui/material";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import { getEmployees, getDepartments } from "../services/employeeService";
import { getLeaveRequests } from "../services/leaveService";
import { getAttendanceRecords } from "../services/attendanceService";

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState([
    {
      label: "Total Employees",
      value: 0,
      icon: <PeopleIcon fontSize="large" />,
    },
    {
      label: "Pending Leaves",
      value: 0,
      icon: <RequestPageIcon fontSize="large" />,
    },
    {
      label: "Departments",
      value: 0,
      icon: <DashboardIcon fontSize="large" />,
    },
    {
      label: "Approved Leaves",
      value: 0,
      icon: <RequestPageIcon fontSize="large" />,
    },
    {
      label: "Employees on Leave",
      value: 0,
      icon: <PeopleIcon fontSize="large" />,
    },
    {
      label: "Staff at Work Today",
      value: 0,
      icon: <PeopleIcon fontSize="large" />,
    },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const employees = await getEmployees();
        const leaveRequests = await getLeaveRequests();
        const attendanceRecords = await getAttendanceRecords();

        const totalEmployees = employees.length; // Count employees
        const pendingLeaves = leaveRequests.filter(
          (leave) => leave.status === "Pending"
        ).length; // Count pending leaves
        const approvedLeaves = leaveRequests.filter(
          (leave) => leave.status === "Approved"
        ).length; // Count approved leaves
        const employeesOnLeave = new Set(
          leaveRequests
            .filter(
              (leave) =>
                leave.status === "Approved" &&
                dayjs().isBetween(
                  dayjs(leave.startDate),
                  dayjs(leave.endDate),
                  null,
                  "[]"
                )
            )
            .map((leave) => leave.employeeID)
        ).size; // Count unique employees currently on leave
        const departments = [
          ...new Set(employees.map((emp) => emp.department)),
        ]; // Extract unique departments
        const staffAtWorkToday = attendanceRecords.filter(
          (record) =>
            record.status === "Present" &&
            record.date === dayjs().format("YYYY-MM-DD")
        ).length; // Count staff at work today

        console.log("Employees:", employees);
        console.log("Leave Requests:", leaveRequests);
        console.log("Attendance Records:", attendanceRecords);
        console.log("Total Employees:", totalEmployees);
        console.log("Pending Leaves:", pendingLeaves);
        console.log("Approved Leaves:", approvedLeaves);
        console.log("Employees on Leave:", employeesOnLeave);
        console.log("Departments:", departments);
        console.log("Staff at Work Today:", staffAtWorkToday);

        setStats([
          {
            label: "Total Employees",
            value: totalEmployees,
            icon: <PeopleIcon fontSize="large" />,
          },
          {
            label: "Pending Leaves",
            value: pendingLeaves,
            icon: <RequestPageIcon fontSize="large" />,
          },
          {
            label: "Departments",
            value: departments.length,
            icon: <DashboardIcon fontSize="large" />,
          },
          {
            label: "Approved Leaves",
            value: approvedLeaves,
            icon: <RequestPageIcon fontSize="large" />,
          },
          {
            label: "Employees on Leave",
            value: employeesOnLeave,
            icon: <PeopleIcon fontSize="large" />,
          },
          {
            label: "Staff at Work Today",
            value: staffAtWorkToday,
            icon: <PeopleIcon fontSize="large" />,
          },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3} alignItems="flex-start">
        {/* Welcome Card - Left */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Welcome, {user?.name}!
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                Role: {user?.role} • {dayjs().format("dddd, MMMM D, YYYY")}
              </Typography>
              <Typography variant="body1" mt={2}>
                Built as part of the Final Internship Hands-On Project. Here you
                can:
              </Typography>
              <ul>
                <li>Manage employee records</li>
                <li>Manage leave requests</li>
                <li>Manage profile information</li>
              </ul>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Let's keep things organized and efficient!
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Stats Cards - Right */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            {stats.slice(0, 3).map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper
                  elevation={6}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    backgroundColor: "#f4f6f8",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      color: "#555",
                    }}
                  >
                    {stat.icon} {stat.label}
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {stat.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {stats.slice(3).map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper
                  elevation={6}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    backgroundColor: "#f4f6f8",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      color: "#555",
                    }}
                  >
                    {stat.icon} {stat.label}
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {stat.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
