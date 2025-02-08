import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import React from "react";

const MainLayout = ({setIsAuthenticated})=>{

    return (
        <StyledEngineProvider injectFirst>
            <Navbar setIsAuthenticated={setIsAuthenticated}/>
            <Outlet/>
        </StyledEngineProvider>
    )
}

export default MainLayout;