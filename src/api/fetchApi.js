import { AxiosInstance } from "./AxiosInstance";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

function fetchBoards() {

    return new Promise((resolve, reject) => {
        AxiosInstance.get(`members/me/boards?fields=name,url,prefs&key=${apiKey}&token=${apiToken}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.message);
            })
    })
}
function fetchOneBoard(boardId) {

    return new Promise((resolve, reject) => {
        AxiosInstance.get(`boards/${boardId}?key=${apiKey}&token=${apiToken}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.message);
            })
    })
}

function fetchLists(boardId) {

    return new Promise((resolve, reject) => {
        AxiosInstance.get(`boards/${boardId}/lists?key=${apiKey}&token=${apiToken}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.message);
            })
    })
}

function fetchListCards(listId) {

    return new Promise((resolve, reject) => {
        AxiosInstance.get(`lists/${listId}/cards?key=${apiKey}&token=${apiToken}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.message)
            })
    })
}

function fetchCheckList(id) {

    return new Promise((resolve, reject) => {
        AxiosInstance.get(`cards/${id}/checklists?key=${apiKey}&token=${apiToken}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.message)
            })
    })
}

function fetchCheckItems(id) {

    return new Promise((resolve, reject) => {
        AxiosInstance.get(`checklists/${id}/checkItems?key=${apiKey}&token=${apiToken}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.message)
            })
    })
}



export { fetchBoards, fetchLists, fetchOneBoard, fetchListCards, fetchCheckList, fetchCheckItems };