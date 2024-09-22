import axios, { AxiosRequestConfig } from "axios";
import Toast from "../components/Toast";
import Task from "../models/task";
import axiosInstance from "./Interceptor";

export const getTask = (id) => {
    return axiosInstance.get("/api/task/" + id).catch(() => {
        Toast.error("Error while fetching task")
    })
}

export const getTasks = () => {
    const workspace = JSON.parse(localStorage.getItem("workspace"));
    return axiosInstance.get("/api/task?workspace=" + workspace.id).catch(() => {
        Toast.error("Error while fetching task")
    })
}

export const addTask = (task: Task) => {
    return axiosInstance.post("/api/task", task)
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                Toast.success("Task added")
            }
        })
        .catch(() => {
            Toast.error("Error while adding task")
        })
}

export const updateTask = (task: Task) => {
    return axiosInstance.put("/api/task", task).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            Toast.success("Task updated")
        }
    })
        .catch(() => {
            Toast.error("Error while updating task")
        })
}

export const deleteTask = (id) => {
    return axiosInstance.delete("/api/task/" + id).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            Toast.success("Task deleted")
        }
    })
        .catch(() => {
            Toast.error("Error while deleting task")
        })
}
