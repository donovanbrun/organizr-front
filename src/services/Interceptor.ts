import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
    baseURL: apiURL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const expiration = localStorage.getItem('expiration');
        if (expiration && new Date(expiration) < new Date()) {
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
            window.location.href = '/login';
        }
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        else if (['/auth/login', '/auth/register'].indexOf(config.url) === -1) {
            window.location.href = '/login';
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
