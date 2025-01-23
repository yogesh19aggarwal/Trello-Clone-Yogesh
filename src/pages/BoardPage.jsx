import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { Box, Typography, Skeleton } from "@mui/material";

import { fetchLists, fetchOneBoard } from "../api/fetchApi";
import ListCard from "../components/ListCard";

const BoardPage = () => {
  const [lists, setLists] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [cardDetails, setCardDetails] = useState({});
  const [showAddList, setShowAddList] = useState(false);
  const { boardId } = useParams();

  useEffect(() => {
    fetchOneBoard(boardId).then((res) => {
      setBoardData(res);
    });
    fetchLists(boardId).then((res) => {
      console.log(res);
      setLists(res);
      setLoading(false);
    });
  }, [boardId]);

  const showList = ()=>{
    setShowAddList((prev)=>!prev);
  }

  const handleCardId=(...args)=>{
    const [details] = args;
    setCardDetails(details);
    setShowModal(true);
  }

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
        lists.map((list)=><ListCard key={list.id} list={list} handleModal={handleCardId}/>)
        ) 
      }
      {!showAddList? (
            <div
                className="add_list min-w-[300px] bg-[#f1f2f4]/40 hover:bg-[#f1f2f4] outline-none border-0 h-max py-2 px-4 rounded-full"
                onClick={showList}
            >
                <div className="message_list flex items-center cursor-pointer">
                    <span className="mr-3">
                        <FaPlus />{" "}
                    </span>
                    Add new list
                </div>
            </div>
            ): <p>hello</p>
        }
        </div>
    </Box>
  );
};

export default BoardPage;
