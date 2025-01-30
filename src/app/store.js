// store.js
import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../features/boardsSlice";

const store = configureStore({
    reducer: {
        board: boardsReducer,
    },
});

export default store;