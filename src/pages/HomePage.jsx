import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid2, Popover, Skeleton, TextField, Button } from "@mui/material";

import { fetchBoards } from "../api/fetchApi";
import { postBoard } from "../api/postApi";
import HomeBoardCard from "../components/HomeBoardCard";

const HomePage = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPopover, setOpenPopover] = useState(null);
  const [boardName, setBoardName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoards()
      .then((res) => {
        setBoards(res);
        setLoading(false);
        console.log(res);
        
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const createNewBoard = async (event) => {
    event.preventDefault();
    if (!boardName.trim()) return;

    try {
      const response = await postBoard(boardName);
      setBoards([...boards, response.data]);
      setBoardName("");
      setOpenPopover(null); 
      navigate(`/:${response.id}`)

    } catch (error) {
      console.error("Error creating board:", error);
      alert("Failed to create board. Please try again.");
    }
  };

  const handleClick = (e) => {
    setOpenPopover(e.currentTarget);
  };

  const handleClose = () => {
    setOpenPopover(null);
  };

  const open = Boolean(openPopover);
  const id = open ? "create-board-popover" : undefined;

  return (
    <Box sx={{ flexGrow: 1, p: 2, width: "100%" }}>
      <h1 style={{ margin: "1rem 9%" }}>Boards</h1>

      <Grid2
        container
        spacing={4}
        sx={{
          justifyContent: "flex-start", 
          margin: "3rem 0 3rem 9%",
          maxWidth: "1200px", 
        }}
      >
        {/* Skeleton Loader */}
        {loading
          ? new Array(10).fill(null).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={250}
                  height={150}
                  sx={{ borderRadius: "10px" }}
                />
            ))
          : boards.map((board, index) => (
                <HomeBoardCard key={index} board={board} />
            ))}

        {/* Create New Board Button */}
        {!loading && (
          <Grid2 item xs={12} sm={6} md={4} lg={3}>
            <Box
              onClick={handleClick}
              sx={{
                width: "250px",
                height: "150px",
                backgroundColor: "#CBD5E1",
                cursor: "pointer",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.9)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "white",
              }}
            >
              Create New Board
            </Box>
          </Grid2>
        )}
      </Grid2>

      {/* Create Board Popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={openPopover}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          component="form"
          onSubmit={createNewBoard}
          sx={{ padding: "1rem", minWidth: "300px" }}
        >
          <TextField
            label="Name of the board"
            variant="outlined"
            fullWidth
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "1rem" }}
            fullWidth
          >
            Create
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default HomePage;
