import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Checkbox, IconButton, Typography, Box } from "@mui/material";

import { putCheckItems } from "../api/putApi";
import SnackBarComponent from "../utils/SnackBarComponent";

const CheckItems = ({ itemData, deleteCheckItem, idCard, updateCheckItem }) => {
  const [checked, setChecked] = useState(
    itemData.state === "complete" ? true : false
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    message: "",
    severity: "success",
  });

  const updateCheckItemState = async () => {
    setChecked((prev) => !prev);
    const newState = checked ? "incomplete" : "complete";
    const checkItemId = itemData.id;

    try {
      await putCheckItems(idCard, checkItemId, newState);
      updateCheckItem(checkItemId, newState);
    } catch (err) {
      showSnackbar(`Error updating item state! ${err}`, "error");
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarOpen(true);
    setSnackbar({ message, severity });
  };

  return (
    <Box className="check_item flex items-center justify-between my-1 w-full">
      <Checkbox
        className="w-[10%]"
        onChange={updateCheckItemState}
        checked={checked}
      />

      <Typography className={`w-[70%] ${checked ? "line-through" : ""}`}>
        {itemData.name}
      </Typography>

      <IconButton
        className="w-[20%] cursor-pointer"
        onClick={() => deleteCheckItem(itemData.id)}
      >
        <RiDeleteBin6Line />
      </IconButton>

      <SnackBarComponent
        message={snackbar.message}
        severity={snackbar.severity}
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
      />
    </Box>
  );
};

export default CheckItems;
