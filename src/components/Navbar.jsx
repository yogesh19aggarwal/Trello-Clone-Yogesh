import { AppBar, Box, Toolbar, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import SnackBarComponent from "../utils/SnackBarComponent";

const Navbar = ({ setIsAuthenticated }) => {
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState('success');
  const navigate = useNavigate();

  const handleLogout = () => {
    handleSnackbar('Logout Successful', 'success')
    setTimeout(()=>{
      setIsAuthenticated(false);
      navigate("/signin");
    },500);
  };

  const handleSnackbar = (message, severity)=>{
    setMessage(message);
    setSeverity(severity);
    setSnackbarOpen(true);
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1E3A8A" }}>
      <Toolbar className="flex justify-between">
        
        <Link to="/" className="no-underline text-white">
          <Typography
            variant="h6"
            component="div"
            className="border-2 border-white px-4 py-1 rounded-lg cursor-pointer"
          >
            Boards
          </Typography>
        </Link>

        <Box className="w-[100px] mx-auto">
          <img
            className="w-full object-contain"
            src="https://trello.com/assets/87e1af770a49ce8e84e3.gif"
            alt="Logo"
          />
        </Box>

        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
        
      </Toolbar>

      <SnackBarComponent message={message} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} severity={severity}/>
    </AppBar>
  );
};

export default Navbar;
