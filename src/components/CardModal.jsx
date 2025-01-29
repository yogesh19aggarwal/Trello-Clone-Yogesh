import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTitle, Button, Popover } from "@mui/material";
import { fetchChecklistAsync, addChecklistAsync, deleteChecklistAsync } from "../features/checklistSlice";
import CheckList from "./CheckList";

const CardModal = ({ showModal, onClose, cardId }) => {
  const dispatch = useDispatch();
  const checkList = useSelector((state) => state.checklist.checklists);
  const status = useSelector((state) => state.checklist.status);
  const [openPopover, setOpenPopover] = useState(null);
  const [checkListName, setCheckListName] = useState("");

  useEffect(() => {
    if (showModal && cardId) {
      dispatch(fetchChecklistAsync(cardId.id));
    }
  }, [dispatch, cardId, showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddCheckList();
  };

  const handleAddCheckList = async () => {
    if (checkListName.trim() === "") return;

    dispatch(addChecklistAsync({ cardId: cardId.id, name: checkListName }));
    setCheckListName("");
    setOpenPopover(null);
  };

  const deleteChecklist = async (id) => {
    if (!id || id.trim() === "") return;

    dispatch(deleteChecklistAsync(id));
  };

  const handlePopOverClick = (e) => {
    setOpenPopover(e.currentTarget);
  };

  const open = Boolean(openPopover);

  if (!cardId?.id) return null;

  return (
    <Dialog open={showModal} onClose={onClose}>
      <DialogContent className="max-w-[900px] h-[500px] min-[300px]:w-[250px] min-[500px]:w-[400px] lg:min-w-[600px]">
        <DialogTitle className="text-left uppercase text-[24px]">{cardId.name}</DialogTitle>

        <div className="w-full h-full flex items-center pt-5 overflow-hidden flex-col-reverse sm:flex-row justify-between">
          <div className="left w-4/6 h-[450px] overflow-y-auto">
            {status === "loading" ? (
              <p>Loading...</p>
            ) : (
              checkList.map((ele) => {
                return <CheckList key={ele?.id} checkListData={ele} deleteCheckList={deleteChecklist} />;
              })
            )}
          </div>
          <div className="w-full sm:w-2/6 sm:border-l-2 sm:h-full px-3">
            <p className="cursor-pointer border-2 shadow-md rounded-md p-2 text-center" onClick={handlePopOverClick}>
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
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="w-full p-2"
                  placeholder="Add CheckList..."
                  value={checkListName}
                  onChange={(e) => setCheckListName(e.target.value)}
                />
                <Button className="bg-blue-800 text-white py-1 mt-2" onClick={handleAddCheckList}>
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
