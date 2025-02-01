import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { putCheckItems } from "../api/putApi";

const CheckItems = ({ itemData ,deleteCheckItem, idCard, updateCheckItem}) => {
  const [checked, setChecked] = useState(itemData.state === "complete" ? true : false);
  const [error, setError] = useState('');

  const updateCheckItemState = async () => {
    setChecked(prev=>!prev);
    const newState = checked ? "incomplete" : "complete";
    const checkItemId = itemData.id;

    try{
      await putCheckItems(idCard, checkItemId, newState);
      updateCheckItem(checkItemId, newState);
    }
    catch(err){
      setError(err);
    }
  };

  return (
    <div className="check_item flex items-center justify-between my-1 w-full">
      {!error?
        <>
          <input
            type="checkbox"
            className="w-[10%]"
            onChange={updateCheckItemState}
            checked={checked} 
          />
          <p className={`w-[70%] ${checked ? "line-through" : ""}`}>{itemData.name}</p>
          <span className="w-[20%] cursor-pointer" onClick={()=>deleteCheckItem(itemData.id)}>
            <RiDeleteBin6Line />
          </span>
      </>
      :
      <h1>{error}</h1>
      }
    </div>
  );
};

export default CheckItems;
