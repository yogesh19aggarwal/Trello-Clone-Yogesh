import { AxiosInstance } from "./AxiosInstance";

async function putCard(id) {
    try {
        const response = await AxiosInstance.put(
            `lists/${id}/closed?value=true`
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
            `cards/${cardId}/checkItem/${itemId}?state=${state}`
        );
        console.log(state, response.data);

        return response.data;
    }
    catch (err) {
        return err.message;
    }
}

export { putCard, putCheckItems };
