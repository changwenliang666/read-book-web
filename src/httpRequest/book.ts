import request from "./axiosConfig";

export function getBookList() {
    return request.get('/book/get-book-list').then((data) => data.data)
}