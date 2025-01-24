import { useState, useEffect } from 'react';
import {Dialog, DialogContent, DialogTitle, Button, Popover} from '@mui/material';

import { fetchCheckList } from '../api/fetchApi';
import { deleteCheckList } from '../api/deleteApi';
import CheckList from './CheckList';
import { postCheckList } from '../api/postApi';

const CardModal = ({showModal, onClose, cardId}) => {
    const [checkList, setCheckList] = useState([]);
    const [openPopover, setOpenPopover] = useState(null);
    const [checkListName, setCheckListName] = useState('');

    useEffect(()=>{
        if(showModal && cardId){
            fetchCheckList(cardId.id)
                .then((res)=>{
                    setCheckList(res);
                })
                .catch((err)=>{
                    throw err;
                })
        }
    },[cardId, showModal]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        handleAddCheckList();
    }
    const handleAddCheckList = async()=>{

        if(checkListName.trim() === ""){
            return;
        }

        try{
            const response = await postCheckList(cardId.id, checkListName);
            setCheckListName("");
            setOpenPopover(!openPopover);
            const newCheckList = [...checkList , response];
            setCheckList(newCheckList);      
        }
        catch(err){
            throw new Error(`${err}`);   
        }
    }

    const deleteChecklist = async(...args)=>{

        const [id] = args;
        if(!id && id.trim() === "") return;

        const newCheckList = checkList.filter((ele)=>{
            return ele.id !== id;
        })

        try{
            await deleteCheckList(id);
            setCheckList(newCheckList);
        }
        catch(error){
            throw new Error(`${error}`);
        }
    }

    const handlePopOverClick = (e)=>{
        setOpenPopover(e.currentTarget);
    }

    const open = Boolean(openPopover);

    if(cardId.id === '') return;

  return (
    <Dialog open={showModal} onClose={onClose}>
        <DialogContent className='max-w-[900px] h-[500px] min-[300px]:w-[250px] min-[500px]:w-[400px] lg:min-w-[600px]'>
            <DialogTitle className="text-left uppercase text-[24px]">
                {cardId.name}
            </DialogTitle>

            <div className="w-full h-full flex items-center pt-5 overflow-hidden flex-col-reverse sm:flex-row justify-between">
                <div className="left w-4/6 h-[450px] overflow-y-auto">
                {checkList &&
                    checkList.map((ele) => {
                    return <CheckList key={ele?.id} checkListData={ele} deleteCheckList={deleteChecklist}/>;
                    })}
                </div>
                <div className="w-full sm:w-2/6 sm:border-l-2 sm:h-full px-3 ">
                    {" "}
                    <p className="cursor-pointer border-2 shadow-md rounded-md p-2 text-center" onClick={handlePopOverClick}>
                        CheckList
                    </p>
                    <Popover open={open} anchorEl={openPopover} onClose={() => setOpenPopover(null)}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }} >
                       <form onSubmit={handleSubmit}> 
                            <input
                                type="text"
                                className="w-full p-2"
                                placeholder="Add CheckList..."
                                value={checkListName}
                                onChange={(e) => setCheckListName(e.target.value)}
                            />
                            <Button
                                className="bg-blue-800 text-white py-1 mt-2"
                                onClick={handleAddCheckList}
                            >
                            Add
                            </Button>
                        </form>
                    </Popover>
                </div>
            </div>


        </DialogContent>
    </Dialog>
  )
}

export default CardModal