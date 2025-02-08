import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";
import { Typography, Button, Container } from "@mui/material";

const NotFound = () => {
  return (
    <Container className="text-center flex flex-col justify-center items-center h-96">
      <FaExclamationTriangle className="text-yellow-400 mb-4" size={50} />
      <Typography variant="h1" className="text-6xl font-bold mb-4">
        404 Not Found
      </Typography>
      <Typography variant="h6" className="text-xl mb-5">
        This page does not exist
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        className="bg-white hover:bg-black hover:text-white rounded-md px-3 py-2 mt-4"
      >
        Go Back
      </Button>
    </Container>
  );
};

export default NotFound;