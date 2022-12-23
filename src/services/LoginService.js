import axios from "axios";
import Toast from "../components/utils/Toast";

const apiURL = process.env.REACT_APP_API_URL;

export const getUserId = () => {
    return localStorage.getItem("userId")
}

export const getUsername = () => {
    return axios.get(apiURL+"/api/user/username").catch(() => {
        localStorage.removeItem("userId");
    })
}

export const login = (username, password) => {
    return axios.post(apiURL+"/api/user/login", {
        "username": username,
        "password": password
    }).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            localStorage.setItem("userId", response.data)
            Toast.success("Connected")
        }
    })
    .catch(() => {
        Toast.error("Connection failed")
    })
}

export const logout = () => {
    localStorage.removeItem("userId");
    Toast.success("Log out");
}