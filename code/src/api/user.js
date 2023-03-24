import axios from "axios"

import { getUserLoginInformation } from "./storage"
import { http } from "../utils/http"


// Reflect.deleteProperty(userLoginStatus.value,'xxx')  用它可以删除一个属性
// userLoginStatus.value.userLoginStatus = xxx  用它可以修改属性


const user = getUserLoginInformation()


// 登录，成功返回数据，失败返回错误信息

export const userLogin = async ({ userAccount, userPassword }) => {
    // return await http
    //     .post('/login', { userAccount, userPassword })
    //     .then(res => res.data)
    //     .catch(err => err)


    // test return
    return {
        "userName": "test userName",
        "accessToken": "test accessToken",
        "refreshToken": "test refreshToken",
    }
}

// 登出

export const userLogout = () => {
    user.value.userLoginStatus = 0 
    user.value.accessToken = null
    user.value.refreshToken
    alert("您已退出登录")
} 


