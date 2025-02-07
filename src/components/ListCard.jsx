import React from "react";
import Card from "@mui/material/Card";
import { CardContent, CardHeader, Typography, Button, Snackbar, Alert, FormControl, TextField, IconButton, Box } from "@mui/material";
import { MdOutlineArchive } from "react-icons/md";
import { CiEdit, CiCirclePlus } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";

import { fetchListCards } from "../api/fetchApi";
import { deleteCard } from "../api/deleteApi";
import { postCard } from "../api/postApi";

const ListCard = ({ list, handleArchive, handleModal }) => {
  const [card, setCard] = useState([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardName, setCardName] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchListCards(list.id)
      .then((res) => setCard(res))
      .catch((err) => showSnackbar(err.message, "error"));
  }, [list.id]);

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleEdit = (cardDetails) => {
    handleModal(cardDetails);
  };

  const handleDeleteCard = async (id) => {
    try {
      await deleteCard(id);
      const newData = card.filter((ele) => ele.id !== id);
      setCard(newData);
      showSnackbar("Card deleted successfully!", "success");
    } catch (err) {
      showSnackbar(err, "error");
    }
  };

  const handleAddCard = async () => {
    if (cardName.trim() === "") {
      setShowAddCard(false);
      return;
    }

    try {
      const response = await postCard(cardName, list.id);
      const newList = [...card, response];
      setCard(newList);
      setShowAddCard(false);
      setCardName("");
      showSnackbar("Card added successfully!", "success");
    } catch (err) {
      showSnackbar(err, "error");
    }
  };

  const handleShow = () => {
    setShowAddCard((prev) => !prev);
  };

  return (
    <Card className="min-w-[400px] bg-[#f1f2f4] outline-none border-0 h-max p-2">
      <CardHeader
        title={
          <Box className="flex justify-between items-center font-medium">
            {list.name}
            <span className="cursor-pointer" onClick={() => handleArchive(list.id)}>
              <MdOutlineArchive />
            </span>
          </Box>
        }
      />
      
      <CardContent>
        {card.length !== 0 ? (
          card.map((ele) => (
            <Box
              key={ele.id}
              className="bg-slate-100 px-3 py-2 rounded-2xl flex items-center justify-between group cursor-pointer mb-2"
            >
              <Typography>{ele.name}</Typography>
              <Box className="flex gap-1 opacity-0 group-hover:opacity-100">
                <CiEdit onClick={() => handleEdit(ele)} className="cursor-pointer mr-1" />
                <RiDeleteBin6Line
                  onClick={() => handleDeleteCard(ele.id)}
                  className="cursor-pointer"
                />
              </Box>
            </Box>
          ))
        ) : (
          <Typography>No cards available</Typography>
        )}
      </CardContent>

      {showAddCard ? (
        <Box className="cursor-pointer rounded-full flex flex-col">
          <FormControl className="w-full">
            <TextField
              label="Add Card"
              variant="outlined"
              fullWidth
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddCard();
              }}
            />
          </FormControl>

          <Box className="action_btn flex items-center justify-between mt-2 block-flex w-full">
            <Button
              className="bg-blue-800 text-white py-1"
              onClick={handleAddCard}
            >
              Add
            </Button>
            <IconButton onClick={handleShow}>
              <RxCross2 className="text-xl" />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box
          className="cursor-pointer hover:bg-black/10 py-2 px-4 rounded-full"
          onClick={handleShow}
        >
          <p className="flex items-center text-lg">
            <span className="mr-3 text-2xl">
              <CiCirclePlus />
            </span>
            Add New Card
          </p>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        anchorOrigin={{vertical:'top', horizontal:'right'}}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ListCard;
