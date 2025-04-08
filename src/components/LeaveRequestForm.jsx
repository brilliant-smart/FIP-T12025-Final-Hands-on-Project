import React, { useState, useContext, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Snackbar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { UserContext } from "../context/UserContext";
import dayjs from "dayjs";

const LeaveRequestForm = () => {
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const existingRequests =
      JSON.parse(localStorage.getItem("leaveRequests")) || [];
    const userRequests = existingRequests.filter(
      (req) => req.userId === (user?.id || user?.employeeID)
    );

    setLeaveRequests(userRequests.sort((a, b) => b.id - a.id)); // Sort recent first

    if (userRequests.length > 0) {
      setLeaveStatus(userRequests[0].status); // Most recent status
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLeave = {
      id: Date.now(),
      userId: user?.id || user?.employeeID,
      name: user?.fullName || user?.username,
      ...formData,
      status: "Pending",
      submittedAt: dayjs().format("YYYY-MM-DD HH:mm"),
    };

    const updatedRequests = [...leaveRequests, newLeave];
    const allRequests = JSON.parse(localStorage.getItem("leaveRequests")) || [];
    localStorage.setItem(
      "leaveRequests",
      JSON.stringify([...allRequests, newLeave])
    );

    setLeaveRequests(updatedRequests.sort((a, b) => b.id - a.id));
    setLeaveStatus("Pending");
    setFormData({ leaveType: "", startDate: "", endDate: "", reason: "" });
    showToast("Leave request submitted successfully!");
  };

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <Box maxWidth={800} mx="auto" mt={5}>
      {/* Leave Records Table */}
      <Typography variant="h5" gutterBottom>
        Leave Records
      </Typography>
      {leaveRequests.length === 0 ? (
        <Typography>No leave records found.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mb: 5 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Leave Type</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Submitted</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.leaveType}</TableCell>
                  <TableCell>{req.startDate}</TableCell>
                  <TableCell>{req.endDate}</TableCell>
                  <TableCell>
                    <strong>{req.status}</strong>
                  </TableCell>
                  <TableCell>{req.submittedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Leave Request Form */}
      <Typography variant="h5" gutterBottom>
        Submit Leave Request
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="Leave Type"
          name="leaveType"
          value={formData.leaveType}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          <MenuItem value="Annual Leave">Annual Leave</MenuItem>
          <MenuItem value="Sick Leave">Sick Leave</MenuItem>
          <MenuItem value="Maternity Leave">Maternity Leave</MenuItem>
          <MenuItem value="Casual Leave">Casual Leave</MenuItem>
        </TextField>

        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          label="End Date"
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          label="Reason"
          name="reason"
          multiline
          rows={4}
          value={formData.reason}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Submit Request
        </Button>
      </form>

      {/* Latest Leave Status */}
      {leaveStatus && (
        <Typography variant="h6" sx={{ mt: 3 }}>
          Your latest leave status: <strong>{leaveStatus}</strong>
        </Typography>
      )}

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
      >
        <MuiAlert
          onClose={handleCloseToast}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default LeaveRequestForm;
