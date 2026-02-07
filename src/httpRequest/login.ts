import request from './axiosConfig'

interface loginUserParams {
    username: string;
    password: string
}

export function userLogin(params: loginUserParams) {
    return request.post('/login', params).then((data) => data.data)
}