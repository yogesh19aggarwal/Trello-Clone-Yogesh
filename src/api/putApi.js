import { AxiosInstance } from "./AxiosInstance";
import { config } from "../config/config";

const { apiKey, apiToken } = config

async function putCard(id) {

    try {
        const response = await AxiosInstance.put(
            `lists/${id}/closed?value=true&key=${apiKey}&token=${apiToken}`
        );
        if (response.status == 200) {
            return response.status;
        }
        else {
            throw new Error(response);
        }
    }
    catch (err) {
        return err.message;
    }
}

async function putCheckItems(cardId, itemId, state) {

    try {
        const response = await AxiosInstance.put(
            `cards/${cardId}/checkItem/${itemId}?key=${apiKey}&token=${apiToken}&state=${state}`
        );

        return response.data;
    }
    catch (err) {
        return err.message;
    }
}


export { putCard, putCheckItems }