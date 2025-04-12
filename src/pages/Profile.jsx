import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";

const Profile = () => {
  const { user, setUser } = useContext(UserContext); // Access user data and update function from context
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Update user context with new data
    setUser({ ...user, ...formData });
    setIsEditing(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        {isEditing ? (
          <>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              disabled
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ mt: 2 }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIsEditing(false)}
              sx={{ mt: 2, ml: 2 }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">Name: {user.name}</Typography>
            <Typography variant="h6">Email: {user.email}</Typography>
            <Typography variant="h6">Role: {user.role}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
              sx={{ mt: 2 }}
            >
              Edit Profile
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Profile;
