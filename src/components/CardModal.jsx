import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, Popover } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCheckList } from '../api/fetchApi';
import { deleteCheckList } from '../api/deleteApi';
import CheckList from './CheckList';
import { postCheckList } from '../api/postApi';
import { setChecklists, addChecklist, deleteChecklist as deleteChecklistAction } from '../features/checklistSlice';

const CardModal = ({ showModal, onClose, cardId }) => {
    const dispatch = useDispatch();
    const checklists = useSelector((state) => state.checklist.checklists[cardId.id] || []);
    const [openPopover, setOpenPopover] = useState(null);
    const [checkListName, setCheckListName] = useState('');

    useEffect(() => {
        if (showModal && cardId) {
            fetchCheckList(cardId.id)
                .then((res) => {
                    dispatch(setChecklists({ cardId: cardId.id, checklists: res }));
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [cardId, showModal, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddCheckList();
    };

    const handleAddCheckList = async () => {
        if (checkListName.trim() === "") {
            return;
        }

        try {
            const response = await postCheckList(cardId.id, checkListName);
            setCheckListName("");
            setOpenPopover(null);
            dispatch(addChecklist({ cardId: cardId.id, checklist: response }));
        } catch (err) {
            console.error(err);
        }
    };

    const deleteChecklist = async (id) => {
        if (!id) return;

        try {
            await deleteCheckList(id);
            dispatch(deleteChecklistAction({ cardId: cardId.id, checklistId: id }));
        } catch (error) {
            console.error(error);
        }
    };

    const handlePopOverClick = (e) => {
        setOpenPopover(e.currentTarget);
    };

    const open = Boolean(openPopover);

    if (cardId.id === '') return null;

  return (
    <Dialog open={showModal} onClose={onClose}>
        <DialogContent className='max-w-[900px] h-[500px] min-[300px]:w-[250px] min-[500px]:w-[400px] lg:min-w-[600px]'>
            <DialogTitle className="text-left uppercase text-[24px]">
                {cardId.name}
            </DialogTitle>

            <div className="w-full h-full flex items-center pt-5 overflow-hidden flex-col-reverse sm:flex-row justify-between">
                <div className="left w-4/6 h-[450px] overflow-y-auto">
                {checklists &&
                    checklists.map((ele) => {
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