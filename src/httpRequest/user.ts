import request from "@/httpRequest/axiosConfig";

export function getUserInfoPro(userId: number) {
    return request.get(`/user/getUserInfoPro?id=${userId}`).then((data: any) => data.data)
}