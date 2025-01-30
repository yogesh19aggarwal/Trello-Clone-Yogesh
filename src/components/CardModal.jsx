import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTitle, Button, Popover } from "@mui/material";

import CheckList from "./CheckList";
import {
  fetchCheckListAsync,
  addCheckList,
  deleteCheckListById,
  selectCheckLists,
} from "../features/boardsSlice";

const CardModal = ({ showModal, onClose, cardId }) => {
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(null);
  const [checkListName, setCheckListName] = useState("");

  const checkLists = useSelector(selectCheckLists);

  useEffect(() => {
    if (showModal && cardId) {
      dispatch(fetchCheckListAsync(cardId.id));
    }
  }, [showModal, cardId, dispatch]);

  const handleAddCheckList = async () => {
    if (checkListName.trim() === "") return;
    dispatch(addCheckList({ checkListName, cardId: cardId.id }));
    setCheckListName("");
    setOpenPopover(null);
  };

  const handleDeleteCheckList = async (checkListId) => {
    dispatch(deleteCheckListById(checkListId));
  };

  const handlePopOverClick = (e) => {
    setOpenPopover(e.currentTarget);
  };

  const open = Boolean(openPopover);

  if (cardId.id === "") return;

  return (
    <Dialog open={showModal} onClose={onClose}>
      <DialogContent className="max-w-[900px] h-[500px] min-[300px]:w-[250px] min-[500px]:w-[400px] lg:min-w-[600px]">
        <DialogTitle className="text-left uppercase text-[24px]">
          {cardId.name}
        </DialogTitle>
        <div className="w-full h-full flex items-center pt-5 overflow-hidden flex-col-reverse sm:flex-row justify-between">
          <div className="left w-4/6 h-[450px] overflow-y-auto">
            {checkLists.map((checkList) => (
              <CheckList
                key={checkList.id}
                checkListData={checkList}
                deleteCheckList={handleDeleteCheckList}
              />
            ))}
          </div>
          <div className="w-full sm:w-2/6 sm:border-l-2 sm:h-full px-3">
            <p
              className="cursor-pointer border-2 shadow-md rounded-md p-2 text-center"
              onClick={handlePopOverClick}
            >
              CheckList
            </p>
            <Popover
              open={open}
              anchorEl={openPopover}
              onClose={() => setOpenPopover(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddCheckList();
                }}
              >
                <input
                  type="text"
                  className="w-full p-2"
                  placeholder="Add CheckList..."
                  value={checkListName}
                  onChange={(e) => setCheckListName(e.target.value)}
                />
                <Button
                  className="bg-blue-800 text-white py-1 mt-2"
                  onClick={handleAddCheckList}
                >
                  Add
                </Button>
              </form>
            </Popover>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;