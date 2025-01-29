// checklistItemSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { putCheckItems } from "../api/putApi";

export const updateCheckItemStateThunk = createAsyncThunk(
    "checklistItem/updateState",
    async ({ cardId, itemId, state }, { rejectWithValue }) => {
        try {
            await putCheckItems(cardId, itemId, state);
            return { itemId, state };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const checklistItemSlice = createSlice({
    name: "checklistItem",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {
        deleteChecklistItem: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload.itemId);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateCheckItemStateThunk.fulfilled, (state, action) => {
                const { itemId, state: newState } = action.payload;
                const item = state.items.find((item) => item.id === itemId);
                if (item) {
                    item.state = newState;
                }
            })
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.status = "loading";
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.status = "failed";
                    state.error = action.payload;
                }
            );
    },
});

export const { deleteChecklistItem } = checklistItemSlice.actions;
export default checklistItemSlice.reducer;

