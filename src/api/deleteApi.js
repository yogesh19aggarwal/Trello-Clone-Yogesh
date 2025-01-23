import { AxiosInstance } from "./AxiosInstance";

const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

function deleteCard(id) {

    return new Promise((resolve, reject) => {
        AxiosInstance.delete(`cards/${id}?key=${apiKey}&token=${apiToken}`)
            .then((res) => resolve(res))
            .catch((err) => reject(err.message));
    })
}

export { deleteCard };