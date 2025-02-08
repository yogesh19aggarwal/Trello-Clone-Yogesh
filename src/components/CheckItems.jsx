import React, { useContext, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Checkbox, IconButton, Typography, Box } from "@mui/material";

import { putCheckItems } from "../api/putApi";
import { SnackbarContext } from "../layouts/MainLayout";

const CheckItems = ({ itemData, deleteCheckItem, idCard, updateCheckItem }) => {
  const [checked, setChecked] = useState(
    itemData.state === "complete" ? true : false
  );

  const { setMessage, setSnackbarOpen, setSeverity } =
    useContext(SnackbarContext);

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
    setMessage(message);
    setSeverity(severity);
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
    </Box>
  );
};

export default CheckItems;
