import request from "./axiosConfig";

export function uploadFile(formData: any) {
    return request.post('/upload/upload-file', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((data) => data.data)
}