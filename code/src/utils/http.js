import axios from "axios"

import { useRouter } from "vue-router"
import { baseUrl } from "../status/data"

import { getUserLoginInformation } from "../api/storage"

const user = getUserLoginInformation()


export const http = axios.create(
    {
        baseURL: baseUrl
    }
)


http.interceptors.request.use(req => {
    const token = user.value.accessToken
    console.log(token)
    if (token) {
        req.headers.set('Authorization', `Bearer ${token}`)
        
        console.log(req)
    }
    return req
})

http.interceptors.response.use(
    res => res,
    err => {
        console.log(err)
        if (!user.value.userLoginStatus){
            return Promise.reject(err)
        }
        else if (err.response.status === 401) {
            alert('登录失效，请重新登录')
            user.value.userLoginStatus = 0
        }
        return Promise.reject(err)
    }
)

