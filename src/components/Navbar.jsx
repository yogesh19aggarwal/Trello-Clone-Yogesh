import { AppBar, Box, Toolbar } from "@mui/material"
import Typography from '@mui/material/Typography';

const Navbar = () => {
  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar variant="dense" sx={{display:'flex', justifyContent:'space-between', backgroundColor:'#1E3A8A'}}>
                    <Typography variant="h6" color="inherit" component="div" sx={{border:'2px solid white', padding:'0 1rem', borderRadius: '10px', cursor:'pointer'}}>
                        Boards
                    </Typography>
                    <Box sx={{width:'100px', margin:'auto', objectFit:'cover'}}>
                        <img style={{width:'100px'}} src='https://trello.com/assets/d947df93bc055849898e.gif' alt="Logo" />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    </>
  )
}

export default Navbar