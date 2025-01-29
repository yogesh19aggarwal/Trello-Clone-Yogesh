import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCheckList } from "../api/fetchApi";
import { postCheckList } from "../api/postApi";
import { deleteCheckList } from "../api/deleteApi";

// ✅ Fetch checklist from API
export const fetchChecklistAsync = createAsyncThunk(
    "checklist/fetchChecklist",
    async (cardId, { rejectWithValue }) => {
        try {
            const response = await fetchCheckList(cardId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// ✅ Add a checklist
export const addChecklistAsync = createAsyncThunk(
    "checklist/addChecklist",
    async ({ cardId, name }, { rejectWithValue }) => {
        try {
            const response = await postCheckList(cardId, name);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// ✅ Delete a checklist
export const deleteChecklistAsync = createAsyncThunk(
    "checklist/deleteChecklist",
    async (checklistId, { rejectWithValue }) => {
        try {
            await deleteCheckList(checklistId);
            return checklistId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const checklistSlice = createSlice({
    name: "checklist",
    initialState: {
        checklists: [],
        status: "idle", // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {}, // No synchronous reducers needed
    extraReducers: (builder) => {
        builder
            .addCase(fetchChecklistAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchChecklistAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.checklists = action.payload;
            })
            .addCase(fetchChecklistAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(addChecklistAsync.fulfilled, (state, action) => {
                state.checklists.push(action.payload);
            })
            .addCase(deleteChecklistAsync.fulfilled, (state, action) => {
                state.checklists = state.checklists.filter(
                    (item) => item.id !== action.payload
                );
            });
    },
});

export default checklistSlice.reducer;
