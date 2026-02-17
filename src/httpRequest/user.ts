import request from "@/httpRequest/axiosConfig";

export function getUserInfoPro() {
    return request.get(`/user/get-user-info-pro`).then((data: any) => data.data)
}