import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel({value}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", width:'120%' }}>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="h6" color="#99BFC4" >
          {`${value}%`}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1, ml:2}}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
    </Box>
  );
}

export default LinearProgressWithLabel;