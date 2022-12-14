
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : null
        // console.log(token)
        if (token) {
            config.headers['Authorization'] = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    res => {
        return res
    },
    async err => {
        return Promise.reject(err);
    }
)


export default axiosInstance;