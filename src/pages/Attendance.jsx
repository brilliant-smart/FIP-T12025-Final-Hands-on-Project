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
} from "@mui/material";
import {
  getAttendanceRecords,
  addAttendanceRecord,
  updateAttendanceRecord,
  deleteAttendanceRecord,
} from "../services/attendanceService";

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeID: "",
    date: "",
    checkInTime: "",
    checkOutTime: "",
    status: "Present",
  });

  // Fetch attendance records on mount
  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const fetchAttendanceRecords = async () => {
    try {
      const data = await getAttendanceRecords();
      setAttendanceRecords(data);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Add or Update
  const handleSubmit = async () => {
    try {
      if (editingAttendance) {
        await updateAttendanceRecord(editingAttendance.id, formData);
      } else {
        await addAttendanceRecord(formData);
      }
      fetchAttendanceRecords();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving attendance record:", error);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this attendance record?")
    ) {
      await deleteAttendanceRecord(id);
      fetchAttendanceRecords();
    }
  };

  // Open dialog for adding/editing
  const handleOpenDialog = (record = null) => {
    setEditingAttendance(record);
    setFormData(
      record || {
        employeeName: "",
        employeeID: "",
        date: "",
        checkInTime: "",
        checkOutTime: "",
        status: "Present",
      }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAttendance(null);
  };

  return (
    <Box>
      <Typography variant="h4">Attendance Management</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
      >
        Add Attendance Record
      </Button>

      {/* Attendance Table */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Check-in Time</TableCell>
              <TableCell>Check-out Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.employeeName}</TableCell>
                <TableCell>{record.employeeID}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.checkInTime}</TableCell>
                <TableCell>{record.checkOutTime}</TableCell>
                <TableCell>{record.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenDialog(record)}
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(record.id)} color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Attendance Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingAttendance
            ? "Edit Attendance Record"
            : "Add Attendance Record"}
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
          <TextField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Check-in Time"
            name="checkInTime"
            type="time"
            value={formData.checkInTime}
            onChange={handleChange}
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Check-out Time"
            name="checkOutTime"
            type="time"
            value={formData.checkOutTime}
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
            <MenuItem value="Present">Present</MenuItem>
            <MenuItem value="Absent">Absent</MenuItem>
            <MenuItem value="On Leave">On Leave</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            {editingAttendance ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Attendance;
