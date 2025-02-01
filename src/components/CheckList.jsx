import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";

import CheckItems from "./CheckItems";
import { postCheckItem } from "../api/postApi";
import { fetchCheckItems } from "../api/fetchApi";
import { deleteCheckItem } from "../api/deleteApi";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

const CheckList = ({ checkListData, deleteCheckList }) => {
  const [checkItems, setCheckItems] = useState([]);
  const [showAddCheckItem, setShowAddCheckItem] = useState(false);
  const [checkItemName, setCheckItemName] = useState("");
  const [error, setError] = useState('');
  
  useEffect(()=>{
      fetchCheckItems(checkListData.id).then((response)=>{
        setCheckItems(response);
      }).catch((err)=>{
        setError(err);
      })
  },[checkListData.id])

  function updateCheckItem(checkItemId, newState){
    const newCheckItems = checkItems.map((item) => {
      if (item.id === checkItemId) {
        return { ...item, state: newState }; 
      }
      return item; 
    });
    setCheckItems(newCheckItems);
  }

  const progress = checkItems.filter((item)=> item.state==='complete');
  let progressBar = Math.round((progress.length/checkItems.length)*100);

  const showList = () => {
    setShowAddCheckItem(!showAddCheckItem);
  };

  const handleSubmit =(e)=>{
    e.preventDefault();
    handleAddCheckItem();
  }

  const handleAddCheckItem = async () => {
    if (checkItemName.trim() === "") {
      setCheckItemName("");
      setShowAddCheckItem(!showAddCheckItem);
      return;
    }

    try {
      const response = await postCheckItem(checkListData.id, checkItemName);
      const newCheckItems = [...checkItems, response];
      setCheckItems(newCheckItems);
      setCheckItemName("");
    } catch (err) {
      setError(err);
    }
  };

  const deleteCheckItemFunc = async(id) => {
    const updatedItems = checkItems.filter((item) => item.id !== id);
    try{
      
      await deleteCheckItem(checkListData.id, id);
      setCheckItems(updatedItems);
    }
    catch (err) {
      setError(err);
    }
  };

  return (
    <div className="checklist mb-2 w-full sm:w-5/6 border-b-2 pb-2 last-of-type:border-b-0">
      {!error?
      <>
        <div className="checklist_heading flex items-center justify-between">
          <h1 className="font-semibold text-[20px] capitalize my-2">{checkListData.name}</h1>
          <span
            className="inline-block text-sm border-2 rounded-md py-1 px-2 cursor-pointer"
            onClick={() => deleteCheckList(checkListData.id)}
          >
            Delete
          </span>
        </div>

        <LinearProgressWithLabel value={progressBar} />

        {checkItems.length > 0 &&
          checkItems.map((ele) => (
            <CheckItems
              key={ele.id}
              itemData={ele}
              updateCheckItem = {updateCheckItem}
              deleteCheckItem={deleteCheckItemFunc}
              idCard={checkListData.idCard}
            />
          ))}

        <div className="add_checkItem w-5/6">
          {showAddCheckItem ? (
            <form onSubmit={handleSubmit} className="show w-full bg-[#f1f2f4] hover:bg-[#f1f2f4] outline-none border-0 h-max py-2 px-4 rounded-md">
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
      </>
      :
      <h1>{error}</h1>
      }
    </div>
  );
};

export default CheckList;
