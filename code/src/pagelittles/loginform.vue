<script setup>
import { ref } from "vue"
import { userLogin } from "../api/user";
import { getUserLoginInformation } from "../api/storage";

import '@unocss/reset/tailwind.css'

const user = getUserLoginInformation()
const formEl = ref(null)
const userLoginFormInput = ref(
    {
        userAccount: "",
        userPassword: "",
    }
)

const rules = ref({
    userAccount: [{ required: true, rangelength: [0, 15], message: '用户名不可为空' }],
    userPassword: [{ required: true, rangelength: [0, 15], message: '密码不可为空' }]
})

const userLoginEvent = async () => {

    if (!(await formEl.value.validate(() => { }))) {
        alert('用户名与密码均不可为空')
        return
    }
    try {
        const { accessToken, userName } = await userLogin(userLoginFormInput.value)
        user.value =
        {
            accessToken,
            userName,
            userLoginStatus: 1,
        }
    }
    catch {
        alert("登录失败，请检查网络环境状态及账号密码是否输入正确")
    }
}
</script>

<template>
    <div>
        <ElCard shadow="always">
            <ElForm ref="formEl" :model="userLoginFormInput" :rules="rules" label-width="72px"
                style="width: 25vw;height: 30vh;justify-content: flex-end;" flex flex-col>
                <div h="full" flex flex-col style="justify-content: center;">
                    <ElFormItem label="用户名" prop="userAccount">
                        <ElInput v-model="userLoginFormInput.userAccount" size="large"></ElInput>
                    </ElFormItem>

                    <ElFormItem label="密码" prop="userPassword">
                        <ElInput type="password" v-model="userLoginFormInput.userPassword" size="large"></ElInput>
                    </ElFormItem>
                </div>
                <ElFormItem style="margin-left: -72px;">
                    <ElButton style="margin-left: 40%;" type="primary" color="yellow" @click="userLoginEvent">登录</ElButton>
                </ElFormItem>
            </ElForm>
        </ElCard>
    </div>
</template>