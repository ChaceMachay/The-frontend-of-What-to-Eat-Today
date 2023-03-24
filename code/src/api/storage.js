import { useStorage } from "@vueuse/core"



// 通过动态的本地存储，记录各状态

export const getUserLoginInformation = () => {
    return useStorage('user', 
        {
            userLoginStatus: 0, accessToken: "null", userName: "null",
        }, 
        localStorage, 
        {
            mergeDefaults: true, 
        }
    )
}          