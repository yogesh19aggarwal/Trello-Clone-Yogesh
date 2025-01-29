import { createSlice } from "@reduxjs/toolkit";

const boardsSlice = createSlice({
    name: 'board',
    initialState: {
        boards: [],
    },
    reducers: {
        addBoard: (state, action) => {
            state.boards.push(action.payload);
        },
    },
});

export const { addBoard } = boardsSlice.actions;
export default boardsSlice.reducer;