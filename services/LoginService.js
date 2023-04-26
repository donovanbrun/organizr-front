import axios from "axios";
import Toast from "../src/Toast";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getUserId = () => {
    if (typeof window !== "undefined") return localStorage.getItem("userId")
    return null
}

export const getUsername = () => {
    return axios.get(apiURL + "/api/user/username").catch(() => {
        if (typeof window !== "undefined") localStorage.removeItem("userId");
    })
}

export const login = (username, password) => {
    return axios.post(apiURL + "/api/user/login", {
        "username": username,
        "password": password
    })
    .then((response) => {
        if (response.status >= 200 && response.status < 300) {
            if (typeof window !== "undefined") localStorage.setItem("userId", response.data)
            Toast.success("Connected")
        }
    })
    .catch(() => {
        Toast.error("Connection failed")
    })
}

export const logout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("userId");
    Toast.success("Log out");
}