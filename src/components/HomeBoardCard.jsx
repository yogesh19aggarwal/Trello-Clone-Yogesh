import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const HomeBoardCard = ({ board }) => {
  const backgroundStyle = board.prefs.backgroundColor
    ? { backgroundColor: board.prefs.backgroundColor }
    : { backgroundImage: `url(${board.prefs.backgroundImage})` };


  return (
    <Link to={`/${board.id}`}  style={{textDecoration:'none'}}>
      <Box
        sx={{
          ...backgroundStyle, // Apply conditional background color or image
          width: "250px",
          height: "150px",
          backgroundSize: "cover",
          padding: "0.5rem",
          color: "white",
          cursor: "pointer",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0, 0, 0)", // Slight transparency for shadow
          display: "flex",
          alignItems: "flex-end", // Align text to the bottom
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", // Add slight shadow for better readability
          }}
        >
          {board.name}
        </Typography>
      </Box>
    </Link>
  );
};

export default HomeBoardCard;
