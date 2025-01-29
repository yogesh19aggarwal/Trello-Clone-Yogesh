// CheckItems.js
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { updateCheckItemStateThunk, deleteChecklistItem } from "../features/checklistItemSlice";

const CheckItems = ({ itemData, idCard }) => {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(itemData.state === "complete");

    const handleItemState = async () => {
        const newCheckedState = !checked;
        setChecked(newCheckedState);
        const newState = newCheckedState ? "complete" : "incomplete";

        dispatch(updateCheckItemStateThunk({ cardId: idCard, itemId: itemData.id, state: newState }));
    };

    const handleDelete = () => {
        dispatch(deleteChecklistItem({ cardId: idCard, itemId: itemData.id }));
    };

    return (
        <div className="check_item flex items-center justify-between my-1 w-full">
            <input type="checkbox" className="w-[10%] cursor-pointer" onChange={handleItemState} checked={checked} />
            <p className={`w-[70%] ${checked ? "line-through" : ""}`}>{itemData.name}</p>
            <span className="w-[20%] cursor-pointer" onClick={handleDelete}>
                <RiDeleteBin6Line />
            </span>
        </div>
    );
};

export default CheckItems;