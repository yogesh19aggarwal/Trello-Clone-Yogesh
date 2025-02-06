import { AxiosInstance } from "./AxiosInstance";

function deleteCard(id) {
    return new Promise((resolve, reject) => {
        AxiosInstance.delete(`cards/${id}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err.message));
    });
}

function deleteCheckList(id) {
    return new Promise((resolve, reject) => {
        AxiosInstance.delete(`checklists/${id}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err.message));
    });
}

function deleteCheckItem(id, item_id) {
    return new Promise((resolve, reject) => {
        AxiosInstance.delete(`checklists/${id}/checkItems/${item_id}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err.message));
    });
}

export { deleteCard, deleteCheckList, deleteCheckItem };