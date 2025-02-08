import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import React, { createContext, useState } from "react";
import SnackBarComponent from "../utils/SnackBarComponent";

export const SnackbarContext = createContext();

const MainLayout = ({ setIsAuthenticated }) => {
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState("success");

  return (
    <StyledEngineProvider injectFirst>
      <SnackbarContext.Provider
        value={{ setMessage, setSnackbarOpen, setSeverity }}
      >
        <Navbar setIsAuthenticated={setIsAuthenticated} />
        <SnackBarComponent
          message={message}
          snackbarOpen={snackbarOpen}
          severity={severity}
          setSnackbarOpen={setSnackbarOpen}
        />
        <Outlet />
      </SnackbarContext.Provider>
    </StyledEngineProvider>
  );
};

export default MainLayout;
