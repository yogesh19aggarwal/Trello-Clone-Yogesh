import Card from "@mui/material/Card";
import { CardContent, CardHeader, Typography, Button } from "@mui/material";
import { MdOutlineArchive } from "react-icons/md";
import { CiEdit, CiCirclePlus } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";

import { fetchListCards } from "../api/fetchApi";
import { deleteCard } from "../api/deleteApi";
import { postCard } from "../api/postApi";

const ListCard = ({ list, handleArchive, handleModal }) => {
  const [card, setCard] = useState([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardName, setCardName] = useState('');

  useEffect(() => {
    fetchListCards(list.id)
      .then((res) => setCard(res))
      .catch((err) => console.log(err));
  }, [list.id]);

  const handleEdit = (...args) => {
    const [cardDetails] = args;
    handleModal(cardDetails)
  };

  const handleDeleteCard = async(id) => {

    const newData = card.filter((ele) => {
      return ele.id !== id;
    });

    setCard(newData);
    try{
      await deleteCard(id);
    }
    catch(err){
      console.log(err);
    }
  };

  const handleAddCard = async()=>{

    if (cardName.trim() === "") {
      setShowAddCard(!showAddCard);
      return;
    }

    try{
      const response = await postCard(cardName, list.id)

      const newList = [...card, response.data];
      setCard(newList);
      setShowAddCard(!showAddCard);
      setCardName("");
    }
    catch(err){
      console.log(err);
    }
  }

  const handleShow = ()=>{
    setShowAddCard((prev)=>!prev);
  }

  return (
    <Card className="min-w-[400px] bg-[#f1f2f4] outline-none border-0 h-max p-2">
      {/* Card Header */}
      <CardHeader
        title={
          <div className="flex justify-between items-center font-medium">
            {list.name}
            <span className="cursor-pointer" onClick={()=>handleArchive(list.id)}>
              <MdOutlineArchive />
            </span>
          </div>
        }
      />

      {/* Card Content */}
      <CardContent>
        {card.length !== 0 ? (
          card.map((ele) => (
            <div
              key={ele.id}
              className="bg-slate-100 px-3 py-2 rounded-2xl flex items-center justify-between group cursor-pointer mb-2"
            >
              <Typography>{ele.name}</Typography>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                <CiEdit onClick={() => handleEdit(ele)} className="cursor-pointer" />
                <RiDeleteBin6Line
                  onClick={() => handleDeleteCard(ele.id)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          ))
        ) : (
          <Typography>No cards available</Typography>
        )}
      </CardContent>

      {showAddCard ? (
          <div className="cursor-pointer rounded-full flex flex-col">
            <input
              type="text"
              className="w-full block p-2"
              placeholder="Add Card..."
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />

            <div className="action_btn flex items-center justify-between mt-2 block-flex w-full">
              <Button
                className="bg-blue-800 text-white py-1 "
                onClick={handleAddCard}
              >
                Add
              </Button>
              <span className="cursor-pointer text-xl" onClick={handleShow}>
                <RxCross2 />
              </span>
            </div>
          </div>
        ) : (
          <div
            className="cursor-pointer hover:bg-black/10 py-2 px-4 rounded-full"
            onClick={handleShow}
          >
            <p className="flex items-center text-lg">
              <span className="mr-3 text-2xl ">
                <CiCirclePlus />
              </span>
              Add Card
            </p>
          </div>
        )}

    </Card>
  );
};

export default ListCard;
