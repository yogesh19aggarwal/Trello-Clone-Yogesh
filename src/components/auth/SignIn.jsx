import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

const SignIn = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const hardcodedUsername = "user123";
  const hardcodedPassword = "password123";

  const handleSignIn = (e) => {
    e.preventDefault();

    if (username === hardcodedUsername && password === hardcodedPassword) {
      setIsAuthenticated(true);
      navigate("/boards"); 
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <Container className="flex justify-center items-center min-h-screen bg-gray-100">
      <Box
        component="form"
        onSubmit={handleSignIn}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <Typography variant="h4" className="text-center !mb-4">
          Sign In
        </Typography>

        {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          className="!mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          className="!mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth className="mb-4">
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default SignIn;
