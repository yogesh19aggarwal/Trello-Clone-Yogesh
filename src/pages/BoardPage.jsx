import React,{ useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import {
  Box,
  Typography,
  Skeleton,
  Button,
  TextField,
  Paper,
  IconButton,
} from "@mui/material";

import { fetchLists, fetchOneBoard } from "../api/fetchApi";
import ListCard from "../components/ListCard";
import CardModal from "../components/CardModal";
import { putCard } from "../api/putApi";
import { postList } from "../api/postApi";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import SnackBarComponent from "../utils/SnackBarComponent";

const BoardPage = () => {
  const [lists, setLists] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({});
  const [showAddList, setShowAddList] = useState(false);
  const [listName, setListName] = useState("");
  const [severity, setSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { boardId } = useParams();

  useEffect(() => {
    fetchOneBoard(boardId)
      .then((res) => {
        setBoardData(res);
        document.title = res.name? `${String(res.name).toUpperCase()} - Trello Clone`: 'Trello Clone';
      })
      .catch((err) => handleSnackbar(err.toString(), 'error'));

    fetchLists(boardId)
      .then((res) => {
        setLists(res);
        setLoading(false);
      })
      .catch((err) => handleSnackbar(err.toString(), 'error'));
  }, [boardId]);

  const handleSnackbar = (message, messageType) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setSeverity(messageType);
  };

  const handleCardId=(...args)=>{
    const [details] = args;
    setCardDetails(details);
    setShowModal(true);
  }

  const handleAddList = async () => {
    if (listName.trim() === "") {
      handleSnackbar("List name cannot be empty.", 'error');
      return;
    }

    try {
      const response = await postList(listName, boardId);
      setLists([...lists, response]);
      setShowAddList(false);
      setListName("");
      handleSnackbar("List added successfully.", 'success');
    } catch (err) {
      handleSnackbar(err.toString(),'error');
    }
  };

  const handleArchive = async (listId) => {
    try {
      const response = await putCard(listId);
      if (response === 200) {
        setLists(lists.filter(({ id }) => id !== listId));
        handleSnackbar("List archived successfully.", 'info');
      }
    } catch (err) {
      handleSnackbar(err.toString(), 'error');
    }
  };

  return (
    <Box
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${boardData.prefs?.backgroundImageScaled?.[7]?.url ||
          "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1282x1920/19b35237aec1ad2628f138eeef1e1284/photo-1678811116814-26372fcfef1b.webp"})`,
      }}
    >
      <Typography variant="h4" className="bg-black text-white px-6 py-2">
        {boardData.name}
      </Typography>

      <Box className="flex gap-4 overflow-x-auto py-6 px-8">
        {loading ? (
          new Array(5).fill(null).map((_, index) => (
            <Skeleton key={index} variant="rectangular" className="!min-w-[350px] !h-40 rounded-md" />
          ))
        ) : (
          lists.map((list) => (
            <ErrorBoundary key={list.id}>
              <ListCard list={list} handleModal={handleCardId} handleArchive={handleArchive} />
            </ErrorBoundary>
          ))
        )}

        {!showAddList ? (
          <Button
            variant="contained"
            startIcon={<FaPlus />}
            onClick={() => setShowAddList(true)}
            className="!min-w-[350px] h-[50px] !bg-white !text-black"
          >
            Add new list
          </Button>
        ) : (
          <Paper className="!min-w-[350px] p-4 !h-[150px]">
            <TextField
              fullWidth
              placeholder="Add List..."
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="mb-4"
            />
            <Box className="flex justify-between mt-2">
              <Button variant="contained" color="primary" onClick={handleAddList}>
                Add
              </Button>
              <IconButton onClick={() => setShowAddList(false)}>
                <RxCross2 />
              </IconButton>
            </Box>
          </Paper>
        )}
      </Box>

      <ErrorBoundary>
        <CardModal showModal={showModal} onClose={() => setShowModal(false)} cardDetails={cardDetails} />
      </ErrorBoundary>

      <SnackBarComponent message={snackbarMessage} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} severity={severity}/>
    </Box>
  );
};

export default BoardPage;
