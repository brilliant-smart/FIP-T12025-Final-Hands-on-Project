import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext"; // Import UserContext
import {
  Button,
  Container,
  Typography,
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
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const API_URL = "https://your-api-url.com/api/payrolls"; // Replace with actual backend URL

const Payroll = () => {
  const { user } = useContext(UserContext); // Get logged-in user
  const [payrollData, setPayrollData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPayroll, setCurrentPayroll] = useState({
    id: "",
    name: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    netPay: "",
  });

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const response = await axios.get(API_URL);
      setPayrollData(response.data);
    } catch (error) {
      console.error("Error fetching payrolls:", error);
    }
  };

  const handleChange = (e) => {
    setCurrentPayroll({ ...currentPayroll, [e.target.name]: e.target.value });
  };

  const handleAddPayroll = async () => {
    try {
      const response = await axios.post(API_URL, currentPayroll);
      setPayrollData([...payrollData, response.data]);
      setOpen(false);
    } catch (error) {
      console.error("Error adding payroll:", error);
    }
  };

  const handleEditPayroll = (payroll) => {
    setCurrentPayroll(payroll);
    setEditMode(true);
    setOpen(true);
  };

  const handleUpdatePayroll = async () => {
    try {
      await axios.put(`${API_URL}/${currentPayroll.id}`, currentPayroll);
      setPayrollData(
        payrollData.map((p) =>
          p.id === currentPayroll.id ? currentPayroll : p
        )
      );
      setOpen(false);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating payroll:", error);
    }
  };

  const handleDeletePayroll = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPayrollData(payrollData.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting payroll:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Payroll Management
      </Typography>

      {/* Add Payroll - Only Admin & HR */}
      {(user?.role === "Admin" || user?.role === "HR Manager") && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpen(true);
            setEditMode(false);
          }}
        >
          Add Payroll
        </Button>
      )}

      {/* Payroll Table */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Basic Salary</TableCell>
              <TableCell>Allowances</TableCell>
              <TableCell>Deductions</TableCell>
              <TableCell>Net Pay</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrollData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.basicSalary}</TableCell>
                <TableCell>{row.allowances}</TableCell>
                <TableCell>{row.deductions}</TableCell>
                <TableCell>{row.netPay}</TableCell>
                <TableCell>
                  {/* Edit - Only Admin & HR */}
                  {(user?.role === "Admin" || user?.role === "HR Manager") && (
                    <IconButton
                      onClick={() => handleEditPayroll(row)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  )}

                  {/* Delete - Only Admin */}
                  {user?.role === "Admin" && (
                    <IconButton
                      onClick={() => handleDeletePayroll(row.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Payroll Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editMode ? "Edit Payroll" : "Add Payroll"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            name="name"
            label="Employee Name"
            value={currentPayroll.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            name="basicSalary"
            label="Basic Salary"
            value={currentPayroll.basicSalary}
            onChange={handleChange}
            type="number"
          />
          <TextField
            fullWidth
            margin="dense"
            name="allowances"
            label="Allowances"
            value={currentPayroll.allowances}
            onChange={handleChange}
            type="number"
          />
          <TextField
            fullWidth
            margin="dense"
            name="deductions"
            label="Deductions"
            value={currentPayroll.deductions}
            onChange={handleChange}
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          {(user?.role === "Admin" || user?.role === "HR Manager") && (
            <Button
              onClick={editMode ? handleUpdatePayroll : handleAddPayroll}
              variant="contained"
            >
              {editMode ? "Update" : "Save"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Payroll;
