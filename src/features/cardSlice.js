import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchOneBoard, fetchLists } from "../api/fetchApi";

// Async thunk to fetch data for a specific board
export const fetchBoardData = createAsyncThunk(
    "board/fetchBoardData",
    async (boardId, { rejectWithValue }) => {
        try {
            const boardData = await fetchOneBoard(boardId);
            const lists = await fetchLists(boardId);
            return { boardData, lists };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

