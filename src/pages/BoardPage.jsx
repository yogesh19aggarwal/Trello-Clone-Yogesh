import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import { fetchLists } from "../api/fetchApi";


const BoardPage = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const {boardId} = useParams();

    useEffect(()=>{
        fetchLists(boardId).then((res)=>{
            console.log(res);
            setLists(res);
            setLoading(false);
        });
    }, [boardId])
  return (
    <div>BoardPage</div>
  )
}

export default BoardPage