import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { putCheckItems } from "../api/putApi";

const CheckItems = ({ itemData, handleProgress ,deleteCheckItem, idCard}) => {
  const [checked, setChecked] = useState(itemData.state === "complete" ? true : false);

  const updateCheckItemState = async ( checkItemId, state) => {
    try{
      await putCheckItems(idCard, checkItemId, state);
    }
    catch(err){
      throw new Error(`${err}`);
    }
  };

  function handleItemState() {
    const newCheckedState = !checked;
    setChecked(newCheckedState);

    const newState = newCheckedState ? "complete" : "incomplete";

    updateCheckItemState(itemData.id , newState)

    let newData = { ...itemData, state: newCheckedState ? "complete" : "incomplete" };

    handleProgress(newData);
  }

  return (
    <div className="check_item flex items-center justify-between my-1 w-full">
      <input
        type="checkbox"
        className="w-[10%]"
        onChange={handleItemState}
        checked={checked} 
      />
      <p className={`w-[70%] ${checked ? "line-through" : ""}`}>{itemData.name}</p>
      <span className="w-[20%] cursor-pointer" onClick={()=>deleteCheckItem(itemData.id)}><RiDeleteBin6Line />
      </span>
    </div>
  );
};

export default CheckItems;
