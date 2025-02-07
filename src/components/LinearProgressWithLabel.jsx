import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";

function LinearProgressWithLabel({ value }) {
  return (
    <Box className="flex items-center w-full">
      <Box className="min-w-[35px]">
        <Typography variant="h6" className="text-[#99BFC4]">
          {`${value}%`}
        </Typography>
      </Box>
      <Box className="w-full mr-1 ml-4">
        <LinearProgress variant="determinate" value={Number(value)} />
      </Box>
    </Box>
  );
}

export default LinearProgressWithLabel;
