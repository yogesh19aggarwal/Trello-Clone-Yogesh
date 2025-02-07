import { AppBar, Box, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{backgroundColor:'#1E3A8A'}} >
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
