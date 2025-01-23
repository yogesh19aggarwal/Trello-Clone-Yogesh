import Card from "@mui/material/Card";
import { CardContent, CardHeader, Typography } from "@mui/material";
import { MdOutlineArchive } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";

import { fetchListCards } from "../api/fetchApi";

const ListCard = ({ list }) => {
  const [card, setCard] = useState([]);

  useEffect(() => {
    fetchListCards(list.id)
      .then((res) => setCard(res))
      .catch((err) => console.log(err));
  }, [list.id]);

  const handleEdit = (ele) => {
    console.log("Edit:", ele);
  };

  const handleDeleteCard = (id) => {
    console.log("Delete card with ID:", id);
  };

  return (
    <Card className="min-w-[400px] bg-[#f1f2f4] outline-none border-0 h-max p-2">
      {/* Card Header */}
      <CardHeader
        title={
          <div className="flex justify-between items-center font-medium">
            {list.name}
            <span className="cursor-pointer">
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
              className="bg-white px-3 py-2 rounded-2xl flex items-center justify-between group cursor-pointer mb-2"
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
    </Card>
  );
};

export default ListCard;
