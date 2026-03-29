import request from "./axiosConfig";

export function getUploadFileUrl(filename:string) {
    return request.get(`upload/getUploadFileTempUrl?filename=${filename}`).then((data) => data.data)
}