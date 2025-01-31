import { AxiosInstance } from "./AxiosInstance.js";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

function deleteCard(id) {

    return new Promise((resolve, reject) => {
        AxiosInstance.delete(`cards/${id}?key=${apiKey}&token=${apiToken}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err.message));
    })
}

function deleteCheckList(id) {

    return new Promise((resolve, reject) => {
        AxiosInstance.delete(`checklists/${id}?key=${apiKey}&token=${apiToken}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err.message));
    })
}

function deleteCheckItem(id, item_id) {

    return new Promise((resolve, reject) => {
        AxiosInstance.delete(`checklists/${id}/checkItems/${item_id}?key=${apiKey}&token=${apiToken}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err.message));
    })
}



export { deleteCard, deleteCheckList, deleteCheckItem };