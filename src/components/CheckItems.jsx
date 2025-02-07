import React,{ useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Checkbox, IconButton, Snackbar, Alert, Typography } from "@mui/material";

import { putCheckItems } from "../api/putApi";

const CheckItems = ({ itemData, deleteCheckItem, idCard, updateCheckItem }) => {
  const [checked, setChecked] = useState(itemData.state === "complete" ? true : false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const updateCheckItemState = async () => {
    setChecked((prev) => !prev);
    const newState = checked ? "incomplete" : "complete";
    const checkItemId = itemData.id;

    try {
      await putCheckItems(idCard, checkItemId, newState);
      updateCheckItem(checkItemId, newState);
    } catch (err) {
      showSnackbar(`Error updating item state! ${err}`, 'error');
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <div className="check_item flex items-center justify-between my-1 w-full">
      
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
       
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CheckItems;
