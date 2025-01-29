import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../features/boardsSlice";
import checklistReducer from "../features/checklistSlice";
import checklistItemReducer from "../features/checklistItemSlice";

const store = configureStore({
    reducer: {
        board: boardReducer,
        checklist: checklistReducer,
        checklistItem: checklistItemReducer,
    },
});

export default store;