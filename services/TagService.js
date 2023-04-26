import axios from "axios";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getTags = () => {
    return axios.get(apiURL+"/api/tag")
}