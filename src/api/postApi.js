import { AxiosInstance } from "./AxiosInstance";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

async function postBoard(boardName) {

    try {

        const response = await AxiosInstance.post(
            `boards/?name=${boardName}&prefs_background=blue&key=${apiKey}&token=${apiToken}`
        );
        return response;
    }
    catch (err) {
        return err.message;
    }
}

async function postCard(cardName, id) {

    try {

        const response = await AxiosInstance.post(
            `cards?name=${cardName}&idList=${id}&key=${apiKey}&token=${apiToken}`
        );

        return response;
    }
    catch (err) {
        return err.message;
    }
}

export { postBoard, postCard };