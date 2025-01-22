import { Box } from "@mui/material"

const HomeBoardCard = ({board}) => {
    // console.log(board.prefs.backgroundImage);
    
  return (
    <Box style={{background: `url(${board.prefs.backgroundImage})`, width:'300px', height:'200px', backgroundSize:'cover', backgroundPosition:'center', padding:'0.5rem', color:'white', cursor:'pointer', borderRadius:'10px', boxShadow:'0 2px 5px 0px rgba(0,0,0)'}}>
        <h2>{board.name}</h2>
    </Box>
  )
}

export default HomeBoardCard