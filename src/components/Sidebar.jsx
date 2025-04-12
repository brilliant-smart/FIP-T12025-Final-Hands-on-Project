import React, { useContext, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import MenuIcon from "@mui/icons-material/Menu"; // Import menu icon for mobile view

const Sidebar = () => {
  const { user } = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen size is small
  const [open, setOpen] = useState(false); // State to control the temporary drawer

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Button to toggle drawer on small screens */}
      {isMobile && (
        <IconButton
          color="primary"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          sx={{ position: "absolute", top: 16, left: 16, zIndex: 1201 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"} // Switch between permanent and temporary based on screen size
        open={isMobile ? open : true} // Temporary drawer is controlled via state on mobile
        onClose={handleDrawerToggle} // Close temporary drawer when clicking outside
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
          position: isMobile ? "fixed" : "relative", // For mobile, it's fixed so it stays on top
        }}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
      >
        <List>
          <ListItem button={true} component={Link} to="/">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <Divider />
          {user?.role !== "Employee" && (
            <ListItem button={true} component={Link} to="/employees">
              <ListItemText primary="Employees" />
            </ListItem>
          )}
          <Divider />

          {/* Conditionally render Leave Requests link for Admin only */}
          {user?.role === "Admin" && (
            <ListItem button={true} component={Link} to="/leave-requests">
              <ListItemText primary="Leave Requests" />
            </ListItem>
          )}
          <Divider />
          <ListItem button={true} component={Link} to="/profile">
            <ListItemText primary="Profile" />
          </ListItem>

          {/* Conditionally render the "Apply for Leave" option for Employees */}
          {user?.role === "Employee" && (
            <ListItem button={true} component={Link} to="/leave-request">
              <ListItemText primary="Apply for Leave" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
