// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import boardReducer from '../features/boardsSlice';
import checklistReducer from '../features/checklistSlice'; // Import the checklist reducer

const store = configureStore({
    reducer: {
        board: boardReducer,
        checklist: checklistReducer, // Add the checklist reducer
    },
});

export default store;