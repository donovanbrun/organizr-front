import axios from "axios";
import Toast from "../components/Toast";
import User from "../models/user";
import axiosInstance from "./Interceptor";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getUser = async (): Promise<User> => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("user") === null) {
            const response = await axiosInstance.get("/api/user");
            localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        }
        else {
            return new Promise((resolve) => {
                resolve(JSON.parse(localStorage.getItem("user")));
            });
        }
    }
}

export const login = async (email, password) => {
    try {
        const response = await axios.post(apiURL + "/api/auth/login", {
            "email": email,
            "password": password
        });
        if (response.status >= 200 && response.status < 300) {
            if (typeof window !== "undefined") {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("expiration", response.data.expiration);
                localStorage.removeItem("user");
                getUser();
            }
            Toast.success("Connected");
        }
    } catch {
        Toast.error("Connection failed");
    }
}

export const logout = () => {
    if (typeof window !== "undefined") localStorage.removeItem("token");
    Toast.success("Log out");
}