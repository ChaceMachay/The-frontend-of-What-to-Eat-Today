import { getUserLoginInformation } from "./storage"
import { http } from "../utils/http"


// Reflect.deleteProperty(userLoginStatus.value,'xxx')  用它可以删除一个属性
// userLoginStatus.value.userLoginStatus = xxx  用它可以修改属性


const user = getUserLoginInformation()


// 登录，成功返回数据，失败返回错误信息

export const userLogin = async (a) => {
    return await http({
        method: 'post',
        url: '/background/managers/login',
        data: a,
    })
        .then(res => {
            return res
        })
        .catch(err => {
            console.error(err)
            return err
        })
}

// 登出

export const userLogout = () => {
    user.value.userLoginStatus = 0
    user.value.accessToken = null
    alert("您已退出登录")
}


