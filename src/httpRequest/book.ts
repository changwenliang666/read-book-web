import request from "./axiosConfig";

interface savebookProgress {
    progress:string,
    bookId:number,
    updateTime:string
}

export function getBookList(params: any) {
    return request.get('/book/get-book-list', params).then((data) => data.data)
}

export function createBook(formData: any) {
    return request.post('/book/create-book', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((data) => data.data)
}

export function getBookDetail(bookId: number) {
    return request.get(`/book/get-book-detail?id=${bookId}`).then((data) => data.data)
}
// 保存图书阅读进度
export function updateBookProgress(params:savebookProgress) {
    return request.post(`/book/update-book-progress`,params).then((data) => data.data)
}