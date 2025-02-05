import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, Typography, Button } from "@mui/material";
import { MdOutlineArchive } from "react-icons/md";
import { CiEdit, CiCirclePlus } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

import { addCard, deleteCardById, archiveList, fetchListCard, SelectCards } from "../features/boardsSlice"; 

const ListCard = ({ list, handleModal }) => {
  const dispatch = useDispatch();
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardName, setCardName] = useState("");
  const [err, setErr] = useState('');
  let {id} = list 

  useEffect(() => {
    dispatch(fetchListCard(id));
  }, [id, dispatch]);

  const cardsR = useSelector(SelectCards);
  const cards = cardsR[id] || []
  
  const handleAddCard = async () => {
    if (cardName.trim() === "") {
      setShowAddCard(!showAddCard);
      return;
    }
    dispatch(addCard({ cardName, listId: list.id })).unwrap().then(() => {
      
      setShowAddCard(false);
      setCardName("");
    }).catch((error) => {
      setErr(error);
    });
  };

  const handleDeleteCard = async (cardId) => {
    dispatch(deleteCardById(cardId));
  };

  const handleArchive = async (listId) => {
    dispatch(archiveList(listId));
  };

  const handleShow = () => {
    setShowAddCard((prev) => !prev);
  };

  return (
    <Card className="min-w-[400px] bg-[#f1f2f4] outline-none border-0 h-max p-2">
      {err?
        <>
      
        <CardHeader
          title={
            <div className="flex justify-between items-center font-medium">
              {list.name}
              <span className="cursor-pointer" onClick={() => handleArchive(list.id)}>
                <MdOutlineArchive />
              </span>
            </div>
          }
        />
      
        <CardContent>
          {cards.length !== 0 ? (
            cards.map((card) => (
              <div
                key={card.id}
                className="bg-slate-100 px-3 py-2 rounded-2xl flex items-center justify-between group cursor-pointer mb-2"
              >
                <Typography>{card.name}</Typography>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                  <CiEdit onClick={() => handleModal(card)} className="cursor-pointer" />
                  <RiDeleteBin6Line
                    onClick={() => handleDeleteCard(card.id)}
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
          <form
            className="cursor-pointer rounded-full flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCard();
            }}
          >
            <input
              type="text"
              className="w-full block p-2"
              placeholder="Add Card..."
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
            <div className="action_btn flex items-center justify-between mt-2 block-flex w-full">
              <Button
                className="bg-blue-800 text-white py-1"
                onClick={handleAddCard}
              >
                Add
              </Button>
              <span className="cursor-pointer text-xl" onClick={handleShow}>
                <RxCross2 />
              </span>
            </div>
          </form>
        ) : (
          <div
            className="cursor-pointer hover:bg-black/10 py-2 px-4 rounded-full"
            onClick={handleShow}
          >
            <p className="flex items-center text-lg">
              <span className="mr-3 text-2xl">
                <CiCirclePlus />
              </span>
              Add Card
            </p>
          </div>
        )}
        </>:
        {err}
      }
    </Card>
  );
};

export default ListCard;