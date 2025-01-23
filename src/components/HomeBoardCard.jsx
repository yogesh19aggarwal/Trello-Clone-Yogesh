import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const HomeBoardCard = ({ board }) => {
  const backgroundStyle = board.prefs.backgroundColor
    ? { backgroundColor: board.prefs.backgroundColor }
    : { backgroundImage: `url(${board.prefs.backgroundImage})` };

  return (
    <Link to={`/${board.id}`} className="no-underline">
      <Box
        style={backgroundStyle} // Dynamic inline styles for background
        className="w-[220px] h-[100px] bg-cover p-2 text-white cursor-pointer rounded-lg shadow-md flex items-end"
      >
        <Typography
          variant="h6"
          className="font-bold text-shadow-sm"
          sx={{
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)", // Fine-grained text shadow control
          }}
        >
          {board.name}
        </Typography>
      </Box>
    </Link>
  );
};

export default HomeBoardCard;
