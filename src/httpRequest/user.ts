import request from "@/httpRequest/axiosConfig";

export function getUserInfoPro() {
    return request.get(`/user/getUserInfoPro`).then((data: any) => data.data)
}