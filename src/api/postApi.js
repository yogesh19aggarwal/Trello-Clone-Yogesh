import { AxiosInstance } from "./AxiosInstance";


const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

async function postBoard(boardName) {

    const response = await AxiosInstance.post(
        `boards/?name=${boardName}&prefs_background=blue&key=${apiKey}&token=${apiToken}`
    );

    return response;
}

export { postBoard };