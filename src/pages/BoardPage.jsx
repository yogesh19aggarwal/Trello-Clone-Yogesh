import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Box, Typography, Skeleton, Button } from "@mui/material";

import ListCard from "../components/ListCard";
import CardModal from "../components/CardModal";
import { fetchBoardData, addList } from "../features/boardsSlice";

const BoardPage = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const { boardData, lists, loading } = useSelector((state) => state.board);
  const [showModal, setShowModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({});
  const [showAddList, setShowAddList] = useState(false);
  const [listName, setListName] = useState("");

  useEffect(() => {
    dispatch(fetchBoardData(boardId));
  }, [boardId, dispatch]);

  const handleAddList = async () => {
    if (listName.trim() === "") {
      setShowAddList(false);
      return;
    }
    dispatch(addList({ listName, boardId }));
    setShowAddList(false);
    setListName("");
  };

  const handleCardId = (details) => {
    setCardDetails(details);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Box
      style={{
        backgroundImage: `url(${
          boardData.prefs?.backgroundImageScaled?.[7]?.url ||
          "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1282x1920/19b35237aec1ad2628f138eeef1e1284/photo-1678811116814-26372fcfef1b.webp"
        })`,
      }}
      className="min-h-[93vh] bg-fixed bg-cover bg-center bg-no-repeat"
    >
      <Typography
        variant="h4"
        className="bg-black/30 text-white font-bold px-9 py-2"
      >
        {boardData.name}
      </Typography>

      <div className="mx-auto px-10 w-full py-5 overflow-x-scroll flex gap-4 h-[85vh] no-scrollbar">
      
        {loading ? (
          new Array(5).fill(null).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              sx={{
                minWidth: 350,
                height: index % 2 === 0 ? 240 : 120,
                borderRadius: 2,
              }}
            />
          ))
        ) : (
       
          lists.map((list) => (
            <ListCard
              key={list.id}
              list={list}
              handleModal={handleCardId}
            />
          ))
        )}

        {!showAddList ? (
          <div
            className="add_list min-w-[300px] bg-[#f1f2f4]/40 hover:bg-[#f1f2f4] outline-none border-0 h-max py-2 px-4 rounded-full"
            onClick={() => setShowAddList(true)}
          >
            <div className="message_list flex items-center cursor-pointer">
              <span className="mr-3">
                <FaPlus />{" "}
              </span>
              Add new list
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddList();
            }}
            className="show min-w-[300px] bg-[#f1f2f4] hover:bg-[#f1f2f4] outline-none border-0 h-max py-2 px-4 rounded-md"
          >
            <input
              type="text"
              className="w-full py-2 px-3 rounded-full outline-none"
              placeholder="Add List..."
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            <div className="action_btn flex items-center justify-between mt-2">
              <Button
                className="bg-blue-800 text-white py-1"
                onClick={handleAddList}
              >
                Add
              </Button>
              <span
                className="cursor-pointer"
                onClick={() => setShowAddList(false)}
              >
                <RxCross2 />
              </span>
            </div>
          </form>
        )}
      </div>

      <div className="modal">
        <CardModal
          showModal={showModal}
          onClose={handleCloseModal}
          cardId={cardDetails}
        />
      </div>
    </Box>
  );
};

export default BoardPage;