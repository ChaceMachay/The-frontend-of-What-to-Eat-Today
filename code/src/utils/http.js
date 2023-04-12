import axios from "axios"

import { baseUrl, reloadStatus } from "../status/data"

import { getUserLoginInformation } from "../api/storage"

const user = getUserLoginInformation()


export const http = axios.create(
    {
        baseURL: baseUrl
    }
)


http.interceptors.request.use(req => {
    const token = user.value.accessToken
    if (token) {
        req.headers.set('Authorization', `Bearer ${token}`)
    }
    return req
})

http.interceptors.response.use(
    res => res,
    err => {
        if (!user.value.userLoginStatus){
            return Promise.reject(err)
        }
        else if (err.response.status === 404 || err.response.status === 410) {
            return err
        }
        else if (err.response.status === 401) {
            alert('登录失效，请重新登录')
            reloadStatus.value = true
            user.value.userLoginStatus = 0

        }
        return Promise.reject(err)
    }
)

