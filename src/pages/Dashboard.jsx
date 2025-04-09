import React from "react";
import { Box, Typography, Card, CardContent, Grid, Paper } from "@mui/material";
import dayjs from "dayjs";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RequestPageIcon from "@mui/icons-material/RequestPage";

const Dashboard = ({ user }) => {
  const stats = [
    {
      label: "Total Employees",
      value: 52,
      icon: <PeopleIcon fontSize="large" />,
    },
    {
      label: "Pending Leaves",
      value: 7,
      icon: <RequestPageIcon fontSize="large" />,
    },
    {
      label: "Departments",
      value: 4,
      icon: <DashboardIcon fontSize="large" />,
    },
  ];

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
            {stats.map((stat, index) => (
              <Grid item xs={12} key={index}>
                <Paper
                  elevation={6} // Increased elevation for more modern shadow
                  sx={{
                    p: 3,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    backgroundColor: "#f4f6f8", // Light background for contrast
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
                      color: "#555", // Slightly darker text color for better visibility
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
