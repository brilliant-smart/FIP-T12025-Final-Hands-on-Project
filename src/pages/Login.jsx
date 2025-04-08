import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";

const API_URL = "http://localhost:5173/api/auth/login"; // Using vite localhost since this project is 100% FrontEnd

const Login = () => {
  const { login } = useContext(UserContext); // Context API for auth
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  //this block will be replaced with a mock login
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await axios.post(API_URL, credentials);
  //       const { user, token } = response.data;

  //       // Save user & token
  //       login(user, token);

  //       // Redirect to dashboard
  //       navigate("/dashboard");
  //     } catch (err) {
  //       setError("Invalid email or password");
  //     }
  //   };

  //this is the mock logic
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock users
    const mockUsers = [
      {
        email: "admin@example.com",
        password: "admin123",
        name: "Admin User",
        role: "Admin",
      },
      {
        email: "hr@example.com",
        password: "hr123",
        name: "HR Manager",
        role: "HR Manager",
      },
      {
        email: "employee@example.com",
        password: "employee123",
        name: "John Employee",
        role: "Employee",
      },
    ];

    const foundUser = mockUsers.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (foundUser) {
      const fakeToken = "mock-jwt-token";
      login(foundUser, fakeToken);
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Container component={Paper} sx={{ maxWidth: 400, padding: 3, mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="dense"
          label="Email"
          name="email"
          type="email"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
