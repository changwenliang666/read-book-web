import axios from "axios";
import constants from "@/constants/index";

const request = axios.create({
    baseURL: import.meta.env.VITE_HTTP_BASE_URL,
    timeout: 10000
})

request.interceptors.request.use(config => {
    const token = localStorage.getItem(constants.READ_BOOK_WEB_TOKEN)
    config.headers.Authorization = `Bearer ${token}`
    return config
}, error => {
    return Promise.reject(error)
})


request.interceptors.response.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

export default request