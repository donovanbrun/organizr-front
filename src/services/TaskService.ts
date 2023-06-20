import axios, { AxiosRequestConfig } from "axios";
import Toast from "../components/Toast";
import Task from "../models/task";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getTasks = (tags) => {
    if (tags !== undefined && tags.length > 0) {
        return axios.post(apiURL+"/api/task/tag", tags).catch(() => {
            Toast.error("Error while fetching tasks")
        })
    }
    return axios.get(apiURL+"/api/task/").catch(() => {
        Toast.error("Error while fetching tasks")
    })
}

export const getTask = (id) => {
    return axios.get(apiURL+"/api/task/get/"+id).catch(() => {
        Toast.error("Error while fetching task")
    })
}

export const addTask = (task: Task) => {
    return axios.post(apiURL+"/api/task/add", task)
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
    return axios.put(apiURL+"/api/task/update", task).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            Toast.success("Task updated")
        }
    })
    .catch(() => {
        Toast.error("Error while updating task")
    })
}

export const deleteTask = (id) => {
    return axios.delete(apiURL+"/api/task/delete/"+id).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            Toast.success("Task deleted")
        }
    })
    .catch(() => {
        Toast.error("Error while deleting task")
    })
}

export const exportTask = () => {

    /*
    const config: AxiosRequestConfig = {
        headers: {
            "content-type": "text/csv",
            "responseType": "blob",
        }
    }

    return axios.get(apiURL+"/api/task/export", ).then (response => {
        const type = response.headers['content-type']
        const blobOptions: BlobPropertyBag = { type: type, encoding: 'UTF-8' }
        const blob = new Blob([response.data], blobOptions)
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'export-' + (new Date()).toISOString() + '.csv'
        link.click()
    })*/
}