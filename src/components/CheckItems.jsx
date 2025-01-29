import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { putCheckItems } from "../api/putApi";
import { useDispatch } from "react-redux";
import { updateChecklistItem, deleteChecklistItem } from "../features/checklistItemSlice";

const CheckItems = ({ itemData, handleProgress, idCard }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(itemData.state === "complete");

  const updateCheckItemState = async (checkItemId, state) => {
    try {
      await putCheckItems(idCard, checkItemId, state);
    } catch (err) {
      throw new Error(`${err}`);
    }
  };

  async function handleItemState() {
    const newCheckedState = !checked;
    setChecked(newCheckedState);

    const newState = newCheckedState ? "complete" : "incomplete";

    await updateCheckItemState(itemData.id, newState);

    let newData = { ...itemData, state: newState };
    handleProgress(newData);

    // Dispatch the update action to Redux
    dispatch(updateChecklistItem({ cardId: idCard, itemId: itemData.id, state: newState }));
  }

  const handleDelete = () => {
    dispatch(deleteChecklistItem({ cardId: idCard, itemId: itemData.id }));
  };

  return (
    <div className="check_item flex items-center justify-between my-1 w-full">
      <input
        type="checkbox"
        className="w-[10%] cursor-pointer"
        onChange={handleItemState}
        checked={checked}
      />
      <p className={`w-[70%] ${checked ? "line-through" : ""}`}>{itemData.name}</p>
      <span className="w-[20%] cursor-pointer" onClick={handleDelete}>
        <RiDeleteBin6Line />
      </span>
    </div>
  );
};

export default CheckItems;