import { useEffect, useState } from "react"
import { Box } from "@mui/material";

import { fetchBoards } from "../api/fetchApi";
import HomeBoardCard from "../components/HomeBoardCard";

const HomePage = () => {

  const [boards, setBoards] = useState([]);

  useEffect(()=>{
    fetchBoards().then((res)=>{
      setBoards(res)
      
    }).catch((err)=>{
      console.log(err);
    })
    
  },[]);

  return (
    <>
      <Box
    </>
  )
}

export default HomePage