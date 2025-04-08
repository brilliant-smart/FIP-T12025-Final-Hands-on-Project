import { Typography, Box, Paper, Grid } from "@mui/material";

const HRDashboard = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        HR Manager Dashboard
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Focused on employee records and leave approvals.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Leave Requests</Typography>
            <Typography variant="body2">3 New | 4 Pending</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Recent Hires</Typography>
            <Typography variant="body2">2 Added This Month</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HRDashboard;
