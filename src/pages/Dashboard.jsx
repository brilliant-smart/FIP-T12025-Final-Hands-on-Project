import React from "react";
import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Welcome to the Dashboard</Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        This is where school administrators can manage employees and leave
        requests efficiently.
      </Typography>
    </Box>
  );
};

export default Dashboard;
