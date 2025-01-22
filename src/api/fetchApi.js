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


export { fetchBoards };