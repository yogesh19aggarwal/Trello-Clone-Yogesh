import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, Popover, Snackbar, Alert, Box, TextField, Typography } from '@mui/material';

import { fetchCheckList } from '../api/fetchApi';
import { deleteCheckList } from '../api/deleteApi';
import CheckList from './CheckList';
import { postCheckList } from '../api/postApi';

const CardModal = ({ showModal, onClose, cardDetails }) => {
  const [checkList, setCheckList] = useState([]);
  const [openPopover, setOpenPopover] = useState(null);
  const [checkListName, setCheckListName] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState(''); 

  useEffect(() => {
    if (showModal && cardDetails) {
      fetchCheckList(cardDetails.id)
        .then((res) => {
          setCheckList(res);
        })
        .catch((err) => {
          setError(err);
          setSnackbarMessage('Error fetching checklist');
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        });
    }
  }, [cardDetails, showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddCheckList();
  };

  const handleAddCheckList = async () => {
    if (checkListName.trim() === "") {
      setSnackbarMessage('Please enter a checklist name');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await postCheckList(cardDetails.id, checkListName);
      setCheckListName("");
      setOpenPopover(null);
      const newCheckList = [...checkList, response];
      setCheckList(newCheckList);
      setSnackbarMessage('Checklist added');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      setError(err);
      setSnackbarMessage('Error adding checklist');
      setSnackbarSeverity('error'); 
      setSnackbarOpen(true);
    }
  };

  const deleteChecklist = async (id) => {
    if (!id || id.trim() === "") return;

    const newCheckList = checkList.filter((ele) => ele.id !== id);

    try {
      await deleteCheckList(id);
      setCheckList(newCheckList);
      setSnackbarMessage('Checklist Deleted');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      setError(err);
      setSnackbarMessage('Error deleting checklist');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handlePopOverClick = (e) => {
    setOpenPopover(e.currentTarget);
  };

  const open = Boolean(openPopover);

  if (cardDetails.id === '') return null;

  return (
    <>
      <Dialog open={showModal} onClose={onClose}>
        {!error ? (
          <DialogContent className="max-w-[900px] h-[500px] w-[250px] sm:w-[400px] lg:w-[600px]">
            <DialogTitle className="text-left uppercase text-[24px]">
              {cardDetails.name}
            </DialogTitle>

            <Box className="w-full h-full flex items-center pt-5 overflow-hidden flex-col-reverse sm:flex-row justify-between">
              <Box className="w-4/6 h-[450px] overflow-y-auto">
                {checkList && checkList.map((ele) => (
                  <CheckList key={ele?.id} checkListData={ele} deleteCheckList={deleteChecklist} />
                ))}
              </Box>
              <Box className="w-full sm:w-2/6 sm:border-l-2 sm:h-full px-3 ">
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
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <form onSubmit={handleSubmit} className="p-3">
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
                  </form>
                </Popover>
              </Box>
            </Box>
          </DialogContent>
        ) : (
          <DialogContent className="text-center">
            <Typography>{error}</Typography>
          </DialogContent>
        )}
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          className="w-full"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CardModal;
