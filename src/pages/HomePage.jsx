import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Box, Grid2, Popover, Skeleton,TextField, Button } from "@mui/material";

import { fetchBoards } from "../api/fetchApi";
import HomeBoardCard from "../components/HomeBoardCard";
import { AxiosInstance } from "../api/AxiosInstance";

const HomePage = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPopover, setOpenPopover] = useState(null);
  const [boardName, setBoardName] = useState('');

  useEffect(() => {
    fetchBoards()
      .then((res) => {
        console.log(res);
        setBoards(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const createNewBoard = async (event) => {
    event.preventDefault();
    if (!boardName.trim()) {
      return;
    }

    try {
      console.log(boardName);
      const response = await AxiosInstance.post(
        `boards/?name=${boardName}&key=${import.meta.env.VITE_API_KEY}&token=${import.meta.env.VITE_API_TOKEN}`
      );

      console.log("Board created successfully:", response.data);
      setBoardName("");
      // navigate(`/boards/:${response.data.id}`);

      // alert(`Board "${response.data.name}" created successfully!`);
    } catch (error) {
      console.error("Error creating board:", error);
      alert("Failed to create board. Please try again.");
    }
  };


  const handleClick = (e)=>{
    setOpenPopover(e.currentTarget)
  }

  const open = Boolean(openPopover);
  const id = open ? 'simple-popover' : undefined;

  return (

    <Box sx={{ flexGrow: 1, p: 2,width:'100%' }}>
      <h1 style={{margin:'1rem 9%'}}>Boards</h1>
      
      <Grid2 
        container 
        xs={12} 
        sm={6}  
        md={4}  
        lg={3}  
        spacing={4} 
        style={{ display:'flex', justifyContent:'center', margin:'3rem 0'}}
      >
        {loading? new Array(10).fill(null).map((ele, index)=>{
            return(
              <Skeleton key={index} variant="rectangle" width={250} height={150}/>
            )
          }):
          boards.map((board, index) => (
              <HomeBoardCard key={index} board={board} />
          ))
        }
        {!loading && <div aria-describedby={id} onClick={handleClick} style={{width: '250px', height:'150px', backgroundColor:'#CBD5E1', cursor:'pointer', borderRadius:'10px', boxShadow:'0 2px 5px 0px rgba(0,0,0)', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <p style={{fontSize:'1.7rem', color:'white', fontWeight:'bold'}}>Create New Board</p>
        </div>}
          <Popover id={id} open={open} anchorEl={openPopover} anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}>
            <form onSubmit={createNewBoard} style={{ padding: "1rem" }}>
          <TextField
            label="Name of the board"
            variant="outlined"
            fullWidth
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createNewBoard(e)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "1rem" }}
          >
            Create
          </Button>
        </form>
          </Popover>
      </Grid2>
      
    </Box>
  );
};

export default HomePage;
