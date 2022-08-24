import axios from "axios";

//const apiURL = "http://todo.localhost";
const apiURL = "http://localhost:8080";

export const getStatus = () => {
    return axios.get(apiURL+"/api/task/status");
}

export const getTasks = () => {
    return axios.get(apiURL+"/api/task/user/Donovan");
}

export const addTask = (task) => {
    return axios.post(apiURL+"/api/task/add", task);
}

export const updateTask = (task) => {
    return axios.put(apiURL+"/api/task/update", task);
}

export const deleteTask = (id) => {
    return axios.delete(apiURL+"/api/task/delete/"+id);
}