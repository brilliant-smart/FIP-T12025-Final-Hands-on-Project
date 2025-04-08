import { Typography, Box, Paper } from "@mui/material";

const EmployeeDashboard = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Employee Dashboard
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        View your profile, leave status, and payroll info.
      </Typography>

      <Paper sx={{ padding: 2, mb: 2 }}>
        <Typography variant="h6">Leave Balance</Typography>
        <Typography variant="body2">10 days remaining</Typography>
      </Paper>

      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6">Payroll Summary</Typography>
        <Typography variant="body2">March Salary: Paid</Typography>
      </Paper>
    </Box>
  );
};

export default EmployeeDashboard;
