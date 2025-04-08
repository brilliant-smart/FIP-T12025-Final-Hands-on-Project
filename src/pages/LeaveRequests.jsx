import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {
  getLeaveRequests,
  addLeaveRequest,
  updateLeaveRequest,
  deleteLeaveRequest,
} from "../services/leaveService";

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingLeave, setEditingLeave] = useState(null);
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeID: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    status: "Pending",
  });

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const data = await getLeaveRequests(); // Assuming this returns the list of leave requests
      setLeaveRequests(data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  const handleSubmit = async () => {
    try {
      if (editingLeave) {
        await updateLeaveRequest(editingLeave.id, formData);
        showToast("Leave request updated successfully!", "success");
      } else {
        await addLeaveRequest(formData);
        showToast("Leave request added successfully!", "success");
      }
      fetchLeaveRequests();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving leave request:", error);
      showToast("Error saving leave request!", "error");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this leave request?")) {
      await deleteLeaveRequest(id);
      fetchLeaveRequests();
      showToast("Leave request deleted successfully!", "success");
    }
  };

  const handleApprove = async (id) => {
    try {
      const updatedRequest = {
        ...leaveRequests.find((req) => req.id === id),
        status: "Approved",
      };
      await updateLeaveRequest(id, updatedRequest);
      fetchLeaveRequests();
      showToast("Leave request approved successfully!", "success");
    } catch (error) {
      console.error("Error approving leave request:", error);
      showToast("Error approving leave request!", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      const updatedRequest = {
        ...leaveRequests.find((req) => req.id === id),
        status: "Rejected",
      };
      await updateLeaveRequest(id, updatedRequest);
      fetchLeaveRequests();
      showToast("Leave request rejected successfully!", "success");
    } catch (error) {
      console.error("Error rejecting leave request:", error);
      showToast("Error rejecting leave request!", "error");
    }
  };

  const handleOpenDialog = (leave = null) => {
    setEditingLeave(leave);
    setFormData(
      leave || {
        employeeName: "",
        employeeID: "",
        leaveType: "",
        startDate: "",
        endDate: "",
        status: "Pending",
      }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingLeave(null);
  };

  return (
    <Box>
      <Typography variant="h4">Leave Requests Management</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
      >
        Add Leave Request
      </Button>

      {/* Leave Requests Table */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveRequests.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell>{leave.employeeName}</TableCell>
                <TableCell>{leave.employeeID}</TableCell>
                <TableCell>{leave.leaveType}</TableCell>
                <TableCell>{leave.startDate}</TableCell>
                <TableCell>{leave.endDate}</TableCell>
                <TableCell>{leave.status}</TableCell>
                <TableCell>
                  {leave.status === "Pending" && (
                    <>
                      <Button
                        onClick={() => handleApprove(leave.id)}
                        color="success"
                        sx={{ mr: 2 }}
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(leave.id)}
                        color="error"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button
                    onClick={() => handleOpenDialog(leave)}
                    color="primary"
                    sx={{ ml: 2 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(leave.id)}
                    color="error"
                    sx={{ ml: 2 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Leave Request Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingLeave ? "Edit Leave Request" : "Add Leave Request"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Employee Name"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Employee ID"
            name="employeeID"
            value={formData.employeeID}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <Select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            fullWidth
            displayEmpty
            margin="dense"
          >
            <MenuItem value="" disabled>
              Select Leave Type
            </MenuItem>
            <MenuItem value="Annual Leave">Annual Leave</MenuItem>
            <MenuItem value="Sick Leave">Sick Leave</MenuItem>
            <MenuItem value="Maternity Leave">Maternity Leave</MenuItem>
            <MenuItem value="Unpaid Leave">Unpaid Leave</MenuItem>
          </Select>
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
            displayEmpty
            margin="dense"
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            {editingLeave ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
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

export default LeaveRequests;
