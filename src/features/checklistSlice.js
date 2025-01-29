// src/features/checklistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const checklistSlice = createSlice({
    name: 'checklist',
    initialState: {
        checklists: {},
    },
    reducers: {
        setChecklists: (state, action) => {
            const { cardId, checklists } = action.payload;
            state.checklists[cardId] = checklists;
        },
        addChecklist: (state, action) => {
            const { cardId, checklist } = action.payload;
            if (!state.checklists[cardId]) {
                state.checklists[cardId] = [];
            }
            state.checklists[cardId].push(checklist);
        },
        deleteChecklist: (state, action) => {
            const { cardId, checklistId } = action.payload;
            state.checklists[cardId] = state.checklists[cardId].filter(
                (checklist) => checklist.id !== checklistId
            );
        },
    },
});

export const { setChecklists, addChecklist, deleteChecklist } = checklistSlice.actions;
export default checklistSlice.reducer;