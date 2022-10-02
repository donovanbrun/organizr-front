import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

export const getEvents = () => {
    return axios.get(apiURL+"/api/event/user/Donovan");
}

export const addEvent = (event) => {
    return axios.post(apiURL+"/api/event/add", event);
}