import axios from "axios";
import Toast from "../src/Toast";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getStatus = () => {
    return axios.get(apiURL+"/api/task/status");
}

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

export const addTask = (task) => {
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

export const updateTask = (task) => {
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
    return axios.get(apiURL+"/api/task/export", {
        "content-type": "text/csv",
        "responseType": "blob",
    }).then (response => {
        const type = response.headers['content-type']
        const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'export-' + (new Date()).toISOString() + '.csv'
        link.click()
    })
}