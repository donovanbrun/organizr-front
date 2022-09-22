import axios from "axios";

const apiURL = "http://localhost:8080";

export const getEvents = () => {
    return axios.get(apiURL+"/api/event/user/Donovan");
}