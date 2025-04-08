import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h4" color="error" gutterBottom>
        Access Denied
      </Typography>
      <Typography variant="body1" mb={3}>
        You do not have permission to view this page.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default Unauthorized;
