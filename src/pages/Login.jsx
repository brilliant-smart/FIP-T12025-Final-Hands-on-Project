import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(""); // For displaying errors (invalid login)
  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility

  // Handle change in form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission and mock login logic
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock users with roles
    const mockUsers = [
      {
        username: "admin@example.com",
        password: "admin123",
        name: "Admin User",
        role: "Admin",
      },
      {
        username: "hr@example.com",
        password: "hr123",
        name: "HR Manager",
        role: "HR Manager",
      },
      {
        username: "employee@example.com",
        password: "employee123",
        name: "Employee John",
        role: "Employee",
      },
    ];

    // Check if the username and password match a mock user
    const foundUser = mockUsers.find(
      (user) =>
        user.username === formData.username &&
        user.password === formData.password
    );

    if (foundUser) {
      // Simulate login by setting the user and a fake token
      const fakeToken = "mock-jwt-token"; // Replace with actual token logic when integrated with backend
      login(foundUser, fakeToken); // Call login with user data and token

      navigate("/"); // Redirect to home/dashboard after successful login
    } else {
      setError("Invalid username or password"); // Set error if no user matches
    }
  };

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Paper
          elevation={4}
          sx={{ padding: 4, width: "100%", borderRadius: 3 }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            School Employee Management System
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="textSecondary"
            mb={3}
          >
            Final Internship Hands-On Project – Manage school staff,
            departments, leave requests, and more in one place.
          </Typography>

          {error && (
            <Typography color="error" align="center" mb={2}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              autoFocus // Autofocus for the first input field
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"} // Toggle password visibility
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box mt={3} textAlign="center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ px: 5 }}
              >
                Login
              </Button>
            </Box>
          </form>

          {/* Footer */}
          <Typography
            variant="caption"
            align="center"
            display="block"
            mt={4}
            color="text.secondary"
          >
            Developed as a final hands-on project for FIP FrontEnd T1 2025 by
            Brilliant Smart using React, MUI, and Context API.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
