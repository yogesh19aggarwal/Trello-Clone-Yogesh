import { AxiosInstance } from "./AxiosInstance";

function fetchBoards() {
    return new Promise((resolve, reject) => {
        AxiosInstance.get("/members/me/boards?fields=name,url,prefs")
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.message);
            });
    });
}

function fetchOneBoard(boardId) {
    return new Promise((resolve, reject) => {
        AxiosInstance.get(`/boards/${boardId}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.message);
            });
    });
}

function fetchLists(boardId) {
    return new Promise((resolve, reject) => {
        AxiosInstance.get(`/boards/${boardId}/lists`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.message);
            });
    });
}

function fetchListCards(listId) {
    return new Promise((resolve, reject) => {
        AxiosInstance.get(`/lists/${listId}/cards`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.message);
            });
    });
}

function fetchCheckList(id) {
    return new Promise((resolve, reject) => {
        AxiosInstance.get(`/cards/${id}/checklists`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.message);
            });
    });
}

function fetchCheckItems(id) {
    return new Promise((resolve, reject) => {
        AxiosInstance.get(`/checklists/${id}/checkItems`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.message);
            });
    });
}

export {
    fetchBoards,
    fetchLists,
    fetchOneBoard,
    fetchListCards,
    fetchCheckList,
    fetchCheckItems,
};