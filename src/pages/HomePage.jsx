import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  Skeleton,
  TextField,
  Button,
  Snackbar,
  Alert,
  Box,
  Typography,
  Grid2,
} from "@mui/material";

import { fetchBoards } from "../api/fetchApi";
import { postBoard } from "../api/postApi";
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import HomeBoardCard from "../components/HomeBoardCard";

const HomePage = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPopover, setOpenPopover] = useState(null);
  const [boardName, setBoardName] = useState("");
  const [error, setError] = useState("");
  const [successSnackbar, setSuccessSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoards()
      .then((res) => {
        setBoards(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.toString());
      });
  }, []);

  const createNewBoard = async (event) => {
    event.preventDefault();
    if (!boardName.trim()) return;

    try {
      const response = await postBoard(boardName);
      setBoards([...boards, response]);
      setBoardName("");
      setOpenPopover(null);
      setSuccessSnackbar({
        open: true,
        message: "Board created successfully!",
        severity: "success",
      });
  
      setTimeout(() => {
        navigate(`/boards/${response.data.id}`);
      }, 1000);
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleBoardClick = (boardId) => {
    setSuccessSnackbar({
      open: true,
      message: "Navigating to board...",
      severity: "info",
    });

    setTimeout(() => {
      navigate(`/boards/${boardId}`);
    }, 1000);
  };

  const handleClick = (e) => {
    setOpenPopover(e.currentTarget);
  };

  const handleClose = () => {
    setOpenPopover(null);
  };

  const popoverOpen = Boolean(openPopover);

  return (
    <Box className="flex flex-col w-full px-2 py-4 items-center justify-center">
      <Typography variant="h3" className="text-3xl font-bold m-4 mb-8">
        Boards
      </Typography>

      <Grid2 container spacing={2} className="max-w-[1200px] mt-6 mb-8 justify-center">
        {loading
          ? Array.from(new Array(10)).map((_, index) => (
              <Grid2 item xs={12} sm={6} md={4} lg={3} key={index}>
                <Skeleton
                  variant="rectangular"
                  width={250}
                  height={150}
                  className="rounded"
                />
              </Grid2>
            ))
          : boards.length > 0 ? (
              boards.map((board, index) => (
                <Grid2 item xs={12} sm={6} md={4} lg={3} key={index}>
                  <ErrorBoundary>
                    <Box onClick={() => handleBoardClick(board.id)} className="cursor-pointer">
                      <HomeBoardCard board={board} />
                    </Box>
                  </ErrorBoundary>
                </Grid2>
              ))
            ) : (
              <Grid2 item xs={12}>
                <Typography variant="h4" align="center">
                  There are no boards
                </Typography>
              </Grid2>
            )}

        {!loading && (
          <Grid2 item xs={12} sm={6} md={4} lg={3}>
            {boards.length < 10 && (
              <Button
                variant="contained"
                onClick={handleClick}
                className="w-[220px] h-[100px] bg-slate-500 text-white font-bold text-lg"
              >
                Create New Board
              </Button>
            )}
          </Grid2>
        )}
      </Grid2>

      <Popover
        open={popoverOpen}
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
          className="p-4 w-[300px] flex flex-col gap-2"
        >
          <TextField
            label="Name of the board"
            variant="outlined"
            fullWidth
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </Box>
      </Popover>

      <Snackbar
        open={Boolean(error)}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setError("")} severity="error" className="w-full">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={successSnackbar.open}
        autoHideDuration={6000}
        onClose={() =>
          setSuccessSnackbar({ ...successSnackbar, open: false })
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() =>
            setSuccessSnackbar({ ...successSnackbar, open: false })
          }
          severity={successSnackbar.severity}
          className="w-full"
        >
          {successSnackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;
