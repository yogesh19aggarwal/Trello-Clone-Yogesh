import { AxiosInstance } from "./AxiosInstance";

async function postBoard(boardName) {
    try {
        const response = await AxiosInstance.post(
            `boards/?name=${boardName}&prefs_background=blue`
        );
        return response.data;
    } catch (err) {
        return err.message;
    }
}

async function postCard(cardName, idList) {
    try {
        const response = await AxiosInstance.post(
            `cards?name=${cardName}&idList=${idList}`
        );
        return response.data;
    } catch (err) {
        return err.message;
    }
}

async function postList(name, idBoard) {
    try {
        const response = await AxiosInstance.post(
            `lists?name=${name}&idBoard=${idBoard}`
        );
        return response.data;
    } catch (err) {
        return err.message;
    }
}

async function postCheckItem(id, name) {
    try {
        const response = await AxiosInstance.post(
            `checklists/${id}/checkItems?name=${name}`
        );
        return response.data;
    } catch (err) {
        return err.message;
    }
}

async function postCheckList(idCard, checkListName) {
    try {
        const response = await AxiosInstance.post(
            `checklists?idCard=${idCard}&name=${checkListName}`
        );
        return response.data;
    } catch (err) {
        return err.message;
    }
}

export { postBoard, postCard, postList, postCheckItem, postCheckList };