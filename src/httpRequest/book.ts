import request from './axiosConfig';
import type { savebookProgress } from '@/types/book';

export function getBookList(params: any) {
    return request.get('/book/get-book-list', params).then((data) => data.data);
}

export function createBook(key: string) {
    return request
        .post('/book/create-book', {
            key,
        })
        .then((data) => data.data);
}

export function getCreateBookProgess(taskId: string) {
    return request
        .get(`/book/query-create-book-progress?taskId=${taskId}`)
        .then((data) => data.data);
}

export function getBookDetail(bookId: number) {
    return request
        .get(`/book/get-book-detail?id=${bookId}`)
        .then((data) => data.data);
}
// 保存图书阅读进度
export function updateBookProgress(params: savebookProgress) {
    return request
        .post(`/book/update-book-progress`, params)
        .then((data) => data.data);
}
