import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
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
  TablePagination,
} from "@mui/material";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  generateEmployeeID,
} from "../services/employeeService";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    employeeID: "",
    department: "",
    position: "",
    contact: "",
  });

  // Toast state
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Validation state
  const [errors, setErrors] = useState({});

  // Search term state
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Toast display function
  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.department.trim())
      newErrors.department = "Department is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!formData.contact.trim()) newErrors.contact = "Contact is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      showToast("Error fetching employees", "error");
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Add or Update
  const handleSubmit = async () => {
    if (!validateForm()) return; // Only proceed if validation passes

    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, formData);
        showToast("Employee updated successfully", "success");
      } else {
        await addEmployee(formData);
        showToast("Employee added successfully", "success");
      }
      fetchEmployees();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving employee:", error);
      showToast("Error saving employee", "error");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
        showToast("Employee deleted successfully", "success");
      } catch (error) {
        console.error("Error deleting employee:", error);
        showToast("Error deleting employee", "error");
      }
    }
  };

  // Open dialog for adding/editing with auto ID
  const handleOpenDialog = async (employee = null) => {
    if (employee) {
      setFormData(employee);
    } else {
      const employeeID = await generateEmployeeID(); // Auto-generate ID
      setFormData({
        name: "",
        employeeID,
        department: "",
        position: "",
        contact: "",
      });
    }
    setEditingEmployee(employee);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingEmployee(null);
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((emp) =>
    Object.values(emp)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Paginate filtered employees
  const paginatedEmployees = filteredEmployees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4">Employee Management</Typography>

      {/* Search Bar */}
      <TextField
        label="Search Employee"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
        sx={{ marginBottom: 2 }}
      >
        Add Employee
      </Button>

      {/* Employee Table */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEmployees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.employeeID}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>{emp.contact}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenDialog(emp)} color="primary">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(emp.id)} color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredEmployees.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {/* Add/Edit Employee Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingEmployee ? "Edit Employee" : "Add Employee"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="dense"
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Employee ID"
            name="employeeID"
            value={formData.employeeID}
            onChange={handleChange}
            fullWidth
            margin="dense"
            disabled
          />
          <TextField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            fullWidth
            margin="dense"
            error={!!errors.department}
            helperText={errors.department}
          />
          <TextField
            label="Position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            fullWidth
            margin="dense"
            error={!!errors.position}
            helperText={errors.position}
          />
          <TextField
            label="Contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            fullWidth
            margin="dense"
            error={!!errors.contact}
            helperText={errors.contact}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            {editingEmployee ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Snackbar */}
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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

export default Employees;
