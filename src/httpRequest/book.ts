import request from "./axiosConfig";

export function getBookList() {
    return request.get('/book/get-book-list').then((data) => data.data)
}

export function createBook(formData: any) {
    return request.post('/book/create-book', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((data) => data.data)
}
