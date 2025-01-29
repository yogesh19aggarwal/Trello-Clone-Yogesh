// src/features/checklistItemSlice.js
import { createSlice } from '@reduxjs/toolkit';

const checklistItemSlice = createSlice({
    name: 'checklistItem',
    initialState: {
        items: {},
    },
    reducers: {
        setChecklistItems: (state, action) => {
            const { cardId, items } = action.payload;
            state.items[cardId] = items;
        },
        updateChecklistItem: (state, action) => {
            const { cardId, itemId, state: itemState } = action.payload;
            const item = state.items[cardId].find((item) => item.id === itemId);
            if (item) {
                item.state = itemState;
            }
        },
        deleteChecklistItem: (state, action) => {
            const { cardId, itemId } = action.payload;
            state.items[cardId] = state.items[cardId].filter((item) => item.id !== itemId);
        },
    },
});

export const { setChecklistItems, updateChecklistItem, deleteChecklistItem } = checklistItemSlice.actions;
export default checklistItemSlice.reducer;