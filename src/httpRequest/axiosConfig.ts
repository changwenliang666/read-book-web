import axios from "axios";
import constants from "@/constants/index";
import { showMessage } from "@/utils";

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


request.interceptors.response.use(res => {
    if (res.data.code === 401) {
        showMessage({
            type: 'error',
            message: res.data.message
        })
        return Promise.resolve<any>({
            ...res,
            data: {
                ...res.data,
                _handle: true
            }
        })
    }
    return res
}, error => {
    return Promise.reject(error)
})

export default request