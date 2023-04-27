import axios from "axios";
import Toast from "../src/Toast";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getPostit = () => {
    return axios.get(apiURL+"/api/postit");
}

export const createPostit = (postit) => {
    return axios.post(apiURL+"/api/postit/create", postit)
    .catch(() => {
        Toast.error("Error while adding postit")
    })
}

export const updatePostit = (postit) => {
    return axios.put(apiURL+"/api/postit/update", postit)
    .catch(() => {
        Toast.error("Error while updating postit")
    })
}

export const deletePostit = (id) => {
    return axios.delete(apiURL+"/api/postit/delete/"+id)
    .catch(() => {
        Toast.error("Error while deleting postit")
    })
}