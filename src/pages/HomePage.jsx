import { useEffect, useState } from "react";
import { Box, Grid2 } from "@mui/material";

import { fetchBoards } from "../api/fetchApi";
import HomeBoardCard from "../components/HomeBoardCard";

const HomePage = () => {

  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetchBoards()
      .then((res) => {
        console.log(res);
        
        setBoards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 2, margin:'3rem 1rem' }}>
      <Grid2 
        container 
        xs={12} // Full width on extra-small screens
        sm={6}  // Half width on small screens
        md={4}  // One-third width on medium screens
        lg={3}  // One-fourth width on large screens
        spacing={4} // Adds spacing between Grid2 items
      >
        {boards.map((board, index) => (
            <HomeBoardCard key={index} board={board} />
        ))}
      </Grid2>
    </Box>
  );
};

export default HomePage;
