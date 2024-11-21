import axios from "axios";
import Toast from "../components/Toast";
import axiosInstance from "./Interceptor";

export const getPostit = () => {
    const workspace = JSON.parse(localStorage.getItem("workspace"));
    return axiosInstance.get("/api/postit?workspace=" + workspace.id);
}

export const createPostit = (postit) => {
    return axiosInstance.post("/api/postit", postit)
        .catch(() => {
            Toast.error("Error while adding postit")
        })
}

export const updatePostit = (postit) => {
    return axiosInstance.put("/api/postit", postit)
        .catch(() => {
            Toast.error("Error while updating postit")
        })
}

export const deletePostit = (id) => {
    return axiosInstance.delete("/api/postit/" + id)
        .catch(() => {
            Toast.error("Error while deleting postit")
        })
}