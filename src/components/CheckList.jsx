import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";

import CheckItems from "./CheckItems";
import {
  fetchCheckItemsAsync,
  addCheckItem,
  deleteCheckItemById,
  selectCheckItems,
} from "../features/boardsSlice";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

const CheckList = ({ checkListData, deleteCheckList }) => {
  
  const { id, idCard} = checkListData;
  const dispatch = useDispatch();
  const [showAddCheckItem, setShowAddCheckItem] = useState(false);
  const [checkItemName, setCheckItemName] = useState("");

  const checkItems = useSelector((state) =>
    selectCheckItems(state, checkListData.id)
  );

  useEffect(() => {
    dispatch(fetchCheckItemsAsync(checkListData.id));
  }, [checkListData.id, dispatch]);

  // Calculate progress
  const calculateProgress = () => {
    if (!checkItems || checkItems.length === 0) return 0;

    const completedItems = checkItems.filter(item => item.state === "complete").length;
    return Math.round((completedItems / checkItems.length) * 100);
  };


  const handleAddCheckItem = async () => {
    if (checkItemName.trim() === "") return;
    dispatch(addCheckItem({ checkItemName, checkListId: checkListData.id }));
    setCheckItemName("");
    setShowAddCheckItem(false);
  };

  const handleDeleteCheckItem = async (checkItemId) => {
    dispatch(deleteCheckItemById({ checkListId: id, checkItemId }));
  };

  const showList = () => {
    setShowAddCheckItem((prev) => !prev);
  };

  return (
    <div className="checklist mb-2 w-full sm:w-5/6 border-b-2 pb-2 last-of-type:border-b-0">
      <div className="checklist_heading flex items-center justify-between">
        <h1 className="font-semibold text-[20px] capitalize my-2">
          {checkListData.name}
        </h1>
        <span
          className="inline-block text-sm border-2 rounded-md py-1 px-2 cursor-pointer"
          onClick={() => deleteCheckList(checkListData.id)}
        >
          Delete
        </span>
      </div>
     
      <LinearProgressWithLabel value={calculateProgress()} />
      {checkItems.map((item) => (
        <CheckItems
          key={item.id}
          itemData={item}
          checkListId= {idCard}
          deleteCheckItem={handleDeleteCheckItem}
        />
      ))}
      {showAddCheckItem ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddCheckItem();
          }}
          className="show w-full bg-[#f1f2f4] hover:bg-[#f1f2f4] outline-none border-0 h-max py-2 px-4 rounded-md"
        >
          <input
            type="text"
            className="w-full p-2"
            placeholder="Add CheckItem..."
            value={checkItemName}
            onChange={(e) => setCheckItemName(e.target.value)}
          />
          <div className="action_btn flex items-center justify-between mt-2">
            <Button
              className="bg-blue-800 text-white py-1"
              onClick={handleAddCheckItem}
            >
              Add
            </Button>
            <span className="cursor-pointer" onClick={showList}>
              <RxCross2 />
            </span>
          </div>
        </form>
      ) : (
        <div
          className="add_list w-full bg-[#f1f2f4]/40 hover:bg-[#f1f2f4] outline-none border-0 h-max py-1 px-4 rounded-full mt-2"
          onClick={showList}
        >
          <div className="message_list flex items-center cursor-pointer text-sm text-nowrap">
            <span className="mr-3">
              <FaPlus />{" "}
            </span>
            Add CheckItem...
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckList;