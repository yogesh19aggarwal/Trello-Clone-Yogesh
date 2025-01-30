import { useState } from "react";
import { useDispatch } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";

import { updateCheckItemState } from "../features/boardsSlice";

const CheckItems = ({ checkListId, itemData, deleteCheckItem }) => {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(itemData.state === "complete");

    const handleItemState = async () => {
        const newState = checked ? "incomplete" : "complete";
        try {
            dispatch(
                updateCheckItemState({
                    cardId: checkListId,
                    checkItemId: itemData.id,
                    state: newState,
                })
            );

            setChecked(!checked);
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <div className="check_item flex items-center justify-between my-1 w-full">
            <input
                type="checkbox"
                className="w-[10%]"
                onChange={handleItemState}
                checked={checked}
            />
            <p className={`w-[70%] ${checked ? "line-through" : ""}`}>
                {itemData.name}
            </p>
            <span
                className="w-[20%] cursor-pointer"
                onClick={() => deleteCheckItem(itemData.id)}
            >
                <RiDeleteBin6Line />
            </span>
        </div>
    );
};

export default CheckItems;