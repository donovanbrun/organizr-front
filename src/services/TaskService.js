import axios from "axios";
import Toast from "../components/utils/Toast";

const apiURL = process.env.REACT_APP_API_URL;

export const getStatus = () => {
    return axios.get(apiURL+"/api/task/status");
}

export const getTasks = () => {
    return axios.get(apiURL+"/api/task/").catch(() => {
        Toast.error("Error while fetching tasks")
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
    return axios.get(apiURL+"/api/task/export");
}