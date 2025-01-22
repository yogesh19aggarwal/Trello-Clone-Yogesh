import { AppBar, Box, Toolbar } from "@mui/material"
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
        <div>
            <AppBar sx={{position:'static'}}>
                <Toolbar variant="dense" sx={{display:'flex', justifyContent:'space-between', backgroundColor:'#1E3A8A'}}>
                    <Link to={'/'} style={{textDecoration:'none', color: 'inherit'}}>
                        <Typography variant="h6" color="inherit" component="div" sx={{border:'2px solid white', padding:'0 1rem', borderRadius: '10px', cursor:'pointer'}}>
                            Boards
                        </Typography>
                    </Link>
                    <Box sx={{width:'100px', margin:'auto', objectFit:'cover'}}>
                        <img style={{width:'100px'}} src='https://trello.com/assets/d947df93bc055849898e.gif' alt="Logo" />
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    </>
  )
}

export default Navbar