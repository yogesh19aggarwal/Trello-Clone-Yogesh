import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchBoards, fetchOneBoard, fetchListCards, fetchLists, fetchCheckList, fetchCheckItems } from "../api/fetchApi";
import { postBoard, postList, postCard, postCheckList, postCheckItem } from "../api/postApi";
import { putCard, putCheckItems } from "../api/putApi";
import { deleteCard, deleteCheckList, deleteCheckItem } from "../api/deleteApi";

const initialState = {
    boards: [],
    boardData: {},
    lists: [],
    cards: {},
    checkLists: [],
    checkItems: {},
    loading: false,
    error: null,
};

export const fetchBoardsAsync = createAsyncThunk(
    "board/fetchBoards",
    async () => {
        const response = await fetchBoards();
        return response;
    }
);

export const createBoardAsync = createAsyncThunk(
    "board/createBoard",
    async (boardName) => {
        const response = await postBoard(boardName);
        return response.data;
    }
);

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

export const addList = createAsyncThunk(
    "board/addList",
    async ({ listName, boardId }, { rejectWithValue }) => {
        try {
            const response = await postList(listName, boardId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchListCard = createAsyncThunk(
    "board/fetchListCard",
    async (listId, { rejectWithValue }) => {
        try {
            const response = await fetchListCards(listId);
            return { listId, response };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCheckListAsync = createAsyncThunk(
    "board/fetchCheckList",
    async (cardId, { rejectWithValue }) => {
        try {
            const response = await fetchCheckList(cardId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCheckItemsAsync = createAsyncThunk(
    "board/fetchCheckItems",
    async (checkListId, { rejectWithValue }) => {
        try {
            const response = await fetchCheckItems(checkListId);
            return { checkListId, response };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addCard = createAsyncThunk(
    "board/addCard",
    async ({ cardName, listId }, { rejectWithValue }) => {
        try {
            const response = await postCard(cardName, listId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addCheckList = createAsyncThunk(
    "board/addCheckList",
    async ({ checkListName, cardId }, { rejectWithValue }) => {
        try {
            const response = await postCheckList(cardId, checkListName);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addCheckItem = createAsyncThunk(
    "board/addCheckItem",
    async ({ checkItemName, checkListId }, { rejectWithValue }) => {
        try {
            const response = await postCheckItem(checkListId, checkItemName);
            return { checkListId, response };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteCheckItemById = createAsyncThunk(
    "board/deleteCheckItem",
    async ({ checkListId, checkItemId }, { rejectWithValue, getState }) => {
        try {
            await deleteCheckItem(checkListId, checkItemId);
            const state = getState();
            const updatedCheckItems = state.board.checkItems[checkListId].filter(
                (item) => item.id !== checkItemId
            );
            return { checkListId, updatedCheckItems };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const archiveList = createAsyncThunk(
    "board/archiveList",
    async (listId, { rejectWithValue }) => {
        try {
            await putCard(listId);
            return listId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteCardById = createAsyncThunk(
    "board/deleteCard",
    async (cardId, { rejectWithValue }) => {
        try {
            await deleteCard(cardId);
            return cardId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteCheckListById = createAsyncThunk(
    "board/deleteCheckList",
    async (checkListId, { rejectWithValue }) => {
        try {
            await deleteCheckList(checkListId);
            return checkListId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateCheckItemState = createAsyncThunk(
    "board/updateCheckItemState",
    async ({ cardId, checkItemId, state }, { rejectWithValue }) => {
        try {
            await putCheckItems(cardId, checkItemId, state);
            return { checkItemId, state };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoardsAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBoardsAsync.fulfilled, (state, action) => {
                state.boards = action.payload;
                state.loading = false;
            })
            .addCase(fetchBoardsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createBoardAsync.fulfilled, (state, action) => {
                state.boards.push(action.payload);
            })
            .addCase(fetchBoardData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBoardData.fulfilled, (state, action) => {
                state.boardData = action.payload.boardData;
                state.lists = action.payload.lists;
                state.loading = false;
            })
            .addCase(fetchBoardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addList.fulfilled, (state, action) => {
                state.lists.push(action.payload);
            })
            .addCase(addCard.fulfilled, (state, action) => {
                const list = state.lists.find((list) => list.id === action.payload.listId);
                if (list) {
                    list.cards = list.cards || [];
                    list.cards.push(action.payload);
                }
            })
            .addCase(fetchCheckListAsync.fulfilled, (state, action) => {
                state.checkLists = action.payload;
            })
            .addCase(fetchCheckItemsAsync.fulfilled, (state, action) => {
                const { checkListId, response } = action.payload;
                state.checkItems[checkListId] = response;
            })
            .addCase(addCheckList.fulfilled, (state, action) => {
                state.checkLists.push(action.payload);
            })
            .addCase(addCheckItem.fulfilled, (state, action) => {
                let { checkListId, response } = action.payload;
                if (!state.checkItems[checkListId]) {
                    state.checkItems[checkListId] = []
                }
                state.checkItems[checkListId].push(response)
            })
            .addCase(fetchListCard.fulfilled, (state, action) => {
                let { listId, response } = action.payload;
                state.cards[listId] = response;
                ('extra reducer', state.cards);
            })
            .addCase(archiveList.fulfilled, (state, action) => {
                state.lists = state.lists.filter((list) => list.id !== action.payload);
            })
            .addCase(deleteCardById.fulfilled, (state, action) => {
                state.lists.forEach((list) => {
                    list.cards = list.cards.filter((card) => card.id !== action.payload);
                });
            })
            .addCase(deleteCheckListById.fulfilled, (state, action) => {
                state.checkLists = state.checkLists.filter((cl) => cl.id !== action.payload);
            })
            .addCase(deleteCheckItemById.fulfilled, (state, action) => {
                const { checkListId, updatedCheckItems } = action.payload;
                state.checkItems[checkListId] = updatedCheckItems;
            })
            .addCase(updateCheckItemState.fulfilled, (state, action) => {
                const { checkItemId, state: newState } = action.payload;

                for (const checkListId in state.checkItems) {
                    const checkItems = state.checkItems[checkListId];
                    const checkItemIndex = checkItems.findIndex((item) => item.id === checkItemId);

                    if (checkItemIndex !== -1) {
                        state.checkItems[checkListId][checkItemIndex].state = newState;
                        break;
                    }
                }
            });
    },
});

export const SelectCards = (state) => state.board.cards;
export const selectCheckLists = (state) => state.board.checkLists;
export const selectCheckItems = (state, checkListId) =>
    state.board.checkItems[checkListId] || [];

export default boardSlice.reducer;