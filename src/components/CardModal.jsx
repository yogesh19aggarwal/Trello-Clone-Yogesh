import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Popover,
  Box,
  TextField,
  FormControl,
} from "@mui/material";

import { fetchCheckList } from "../api/fetchApi";
import { deleteCheckList } from "../api/deleteApi";
import CheckList from "./CheckList";
import { postCheckList } from "../api/postApi";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import SnackBarComponent from "../utils/SnackBarComponent";

const CardModal = ({ showModal, onClose, cardDetails }) => {
  const [checkList, setCheckList] = useState([]);
  const [openPopover, setOpenPopover] = useState(null);
  const [checkListName, setCheckListName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    if (showModal && cardDetails) {
      fetchCheckList(cardDetails.id)
        .then((res) => setCheckList(res))
        .catch((err) => {
          handleSnackbar(`Error fetching checklist ${err}`, "error");
        });
    }
  }, [cardDetails, showModal]);

  const handleAddCheckList = async () => {
    if (checkListName.trim() === "") {
      handleSnackbar("Please enter a checklist name", "info");
      return;
    }

    try {
      const response = await postCheckList(cardDetails.id, checkListName);
      setCheckListName("");
      setOpenPopover(null);
      setCheckList([...checkList, response]);
      handleSnackbar("Checklist added", "success");
    } catch (err) {
      handleSnackbar(`Error adding checklist ${err}`, "error");
    }
  };

  const deleteChecklist = async (id) => {
    if (!id || id.trim() === "") return;

    try {
      await deleteCheckList(id);
      setCheckList(checkList.filter((ele) => ele.id !== id));
      handleSnackbar("Checklist Deleted", "success");
    } catch (err) {
      handleSnackbar(`Error deleting checklist ${err}`, "error");
    }
  };

  const handleSnackbar = (message, messageType) => {
    setSnackbarMessage(message);
    setSeverity(messageType);
    setSnackbarOpen(true);
  };

  const handlePopOverClick = (e) => setOpenPopover(e.currentTarget);
  const open = Boolean(openPopover);

  if (cardDetails.id === "") return null;

  return (
    <>
      <Dialog open={showModal} onClose={onClose}>
        <DialogContent className="max-w-[900px] h-[500px] w-[250px] sm:w-[400px] lg:w-[600px]">
          <DialogTitle className="text-left uppercase text-[24px]">
            {cardDetails.name}
          </DialogTitle>

          <Box className="w-full h-full flex items-center pt-5 overflow-hidden flex-col-reverse sm:flex-row justify-between">
            <Box className="w-4/6 h-[450px] overflow-y-auto">
              {checkList.map((ele) => (
                <ErrorBoundary key={ele?.id}>
                  <CheckList
                    checkListData={ele}
                    deleteCheckList={deleteChecklist}
                  />
                </ErrorBoundary>
              ))}
            </Box>
            <Box className="w-full sm:w-2/6 sm:border-l-2 sm:h-full px-3">
              <Button
                variant="outlined"
                className="cursor-pointer border-2 shadow-md rounded-md p-2 text-center w-full"
                onClick={handlePopOverClick}
              >
                CheckList
              </Button>

              <Popover
                open={open}
                anchorEl={openPopover}
                onClose={() => setOpenPopover(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              >
                <FormControl className="p-3 w-full">
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Add CheckList..."
                    value={checkListName}
                    onChange={(e) => setCheckListName(e.target.value)}
                    className="mb-2"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className="w-full py-2"
                    onClick={handleAddCheckList}
                  >
                    Add
                  </Button>
                </FormControl>
              </Popover>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <SnackBarComponent
        message={snackbarMessage}
        severity={severity}
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
      />
    </>
  );
};

export default CardModal;
