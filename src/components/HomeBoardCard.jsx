import { Box } from "@mui/material"

const HomeBoardCard = ({board}) => {
    
  return (
    <Box style={{background: `url(${board.prefs.backgroundImage})`, width:'250px', height:'150px', backgroundSize:'cover', backgroundPosition:'center', padding:'0.5rem', color:'black', cursor:'pointer', borderRadius:'10px', boxShadow:'0 2px 5px 0px rgba(0,0,0)'}}>
        <h2>{board.name}</h2>
    </Box>
  )
}

export default HomeBoardCard;