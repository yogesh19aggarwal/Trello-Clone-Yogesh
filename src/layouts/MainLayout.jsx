import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";

const MainLayout = ()=>{

    return (
        <StyledEngineProvider injectFirst>
            <Navbar/>
            <Outlet/>
        </StyledEngineProvider>
    )
}

export default MainLayout;