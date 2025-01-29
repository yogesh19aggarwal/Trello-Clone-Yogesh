// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import boardReducer from '../features/boardsSlice';
import checklistReducer from '../features/checklistSlice'; // Existing checklist reducer
import checklistItemReducer from '../features/checklistItemSlice'; // Import the checklist item reducer

const store = configureStore({
    reducer: {
        board: boardReducer,
        checklist: checklistReducer,
        checklistItem: checklistItemReducer, // Add the checklist item reducer
    },
});

export default store;