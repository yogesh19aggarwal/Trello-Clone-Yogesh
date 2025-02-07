import React,{ useState, useEffect } from "react";
import { Button, Typography, Box, TextField, Paper, IconButton} from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";

import CheckItems from "./CheckItems";
import { postCheckItem } from "../api/postApi";
import { fetchCheckItems } from "../api/fetchApi";
import { deleteCheckItem } from "../api/deleteApi";
import SnackBarComponent from '../utils/SnackBarComponent' 
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const CheckList = ({ checkListData, deleteCheckList }) => {
  const [checkItems, setCheckItems] = useState([]);
  const [showAddCheckItem, setShowAddCheckItem] = useState(false);
  const [checkItemName, setCheckItemName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    fetchCheckItems(checkListData.id)
      .then((response) => setCheckItems(response))
      .catch((err) => showSnackbar(err, "error"));
  }, [checkListData.id]);

  const showSnackbar = (message, severity) => {
    setMessage(message);
    setSnackbarOpen(true);
    setSeverity(severity)
  };

  function updateCheckItem(checkItemId, newState) {
    const newCheckItems = checkItems.map((item) =>
      item.id === checkItemId ? { ...item, state: newState } : item
    );
    setCheckItems(newCheckItems);
    showSnackbar("CheckItem updated successfully!", "success");
  }

  const progress = checkItems.filter((item) => item.state === "complete");
  let progressBar = Number(Math.round((progress.length / checkItems.length) * 100));

  const showList = () => setShowAddCheckItem(!showAddCheckItem);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddCheckItem();
  };

  const handleAddCheckItem = async () => {
    if (checkItemName.trim() === "") {
      setCheckItemName("");
      setShowAddCheckItem(false);
      return;
    }
    try {
      const response = await postCheckItem(checkListData.id, checkItemName);
      setCheckItems([...checkItems, response]);
      setCheckItemName("");
      showSnackbar("CheckItem added successfully!", "success");
    } catch (err) {
      showSnackbar(err.message, "error");
    }
  };

  const deleteCheckItemFunc = async (id) => {
    try {
      await deleteCheckItem(checkListData.id, id);
      setCheckItems(checkItems.filter((item) => item.id !== id));
      showSnackbar("CheckItem deleted successfully!", "success");
    } catch (err) {
      showSnackbar(err.message, "error");
    }
  };

  return (
    <Paper elevation={0} className="mb-2 w-full sm:w-5/6 p-4">
      <Box className="flex items-center justify-between">
        <Typography variant="h6" className="font-semibold capitalize">
          {checkListData.name}
        </Typography>
        <Button variant="outlined" className="text-sm py-1 px-2" onClick={() => deleteCheckList(checkListData.id)}>
          Delete
        </Button>
      </Box>

      <LinearProgressWithLabel value={progressBar || 0} />

      {checkItems.length > 0 &&
        checkItems.map((ele) => (
          <ErrorBoundary key={ele.id}>
            <CheckItems  itemData={ele} updateCheckItem={updateCheckItem} deleteCheckItem={deleteCheckItemFunc} idCard={checkListData.idCard} />
          </ErrorBoundary>
        ))}

      <Box className="mt-2">
        {showAddCheckItem ? (
          <Paper component="form" onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-md">
            <TextField fullWidth variant="outlined" size="small" placeholder="Add CheckItem..." value={checkItemName} onChange={(e) => setCheckItemName(e.target.value)} />
            <Box className="flex items-center justify-between mt-2">
              <Button variant="contained" className="bg-blue-800 text-white py-1" onClick={handleAddCheckItem}>
                Add
              </Button>
              <IconButton onClick={showList}>
                <RxCross2 />
              </IconButton>
            </Box>
          </Paper>
        ) : (
          <Button startIcon={<FaPlus />} className="w-full bg-gray-200 hover:bg-gray-300 text-sm py-1 px-4 rounded-full" onClick={showList}>
            Add CheckItem...
          </Button>
        )}
      </Box>

      <SnackBarComponent message={message} snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} severity={severity}/>
    </Paper>
  );
};

export default CheckList;
