import { useState, useEffect } from 'react';
import {Dialog, DialogContent, DialogTitle, Button} from '@mui/material';
import { fetchCheckList } from '../api/fetchApi';

import CheckList from './CheckList';

const CardModal = ({showModal, onClose, cardId}) => {
    const [checkList, setCheckList] = useState([]);


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

    const deleteCheckList = ()=>{
        console.log('delete');
        
    }

  return (
    <Dialog open={showModal} onClose={onClose}>
        <DialogContent className='max-w-[900px] h-[500px] w-full'>
            <DialogTitle className="text-left uppercase text-[24px]">
                {cardId.name}
            </DialogTitle>

            <div className="w-full h-full flex items-center pt-5 overflow-hidden flex-col-reverse sm:flex-row justify-between">
                <div className="left w-5/6  h-[450px] overflow-y-auto">
                {checkList &&
                    checkList.map((ele) => {
                    return <CheckList key={ele?.id} checkListData={ele} deleteCheckList={deleteCheckList}/>;
                    })}
                </div>
            {/* <div className="right w-full sm:w-1/6 sm:border-l-2 sm:h-full px-3 ">
              <Popover isOpen={showPopOver} onClose={() => setShowPopOver(false)} >
                <PopoverTrigger>
                  {" "}
                  <p className="cursor-pointer border-2 shadow-md rounded-md p-2 text-center mx-2">
                    CheckList
                  </p>
                </PopoverTrigger>
                <PopoverContent>
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
                </PopoverContent>
              </Popover>
            </div> */}
          </div>


        </DialogContent>
    </Dialog>
  )
}

export default CardModal