<script setup>
import { ref } from "vue"
import { userLogin } from "../api/user";
import { getUserLoginInformation } from "../api/storage";

import '@unocss/reset/tailwind.css'

const user = getUserLoginInformation()
const formEl = ref(null)
const rules = ref({
    userAccount: [{ required: true, message: '用户名不可为空' }],
    userPassword: [{ required: true, message: '密码不可为空' }]
})
const userLoginFormInput = ref(
    {
        userAccount: "",
        userPassword: "",
    }
)



const userLoginEvent = async () => {

    // 表单规则验证
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
        alert("登录失败，请检查网络环境状态及账号密码是否输入正确。")
    }
}
</script>

<template>
    <div class="form">
        <ElCard shadow="always">
            <ElForm ref="formEl" :model="userLoginFormInput" :rules="rules" label-width="72px"
                style="width: 25vw;height: 30vh;justify-content: flex-end;" flex flex-col class="form_body">
                <div h="full" flex flex-col style="justify-content: center;">
                    <ElFormItem label="用户名" prop="userAccount">
                        <ElInput v-model="userLoginFormInput.userAccount" size="large" :class="input"></ElInput>
                    </ElFormItem>

                    <ElFormItem label="密码" prop="userPassword">
                        <ElInput type="password" v-model="userLoginFormInput.userPassword" size="large"></ElInput>
                    </ElFormItem>
                </div>
                <ElFormItem style="margin-left: -72px;">
                    <ElButton style="margin-left: 35%;" type="primary" color="yellow" @click="userLoginEvent">登录</ElButton>
                </ElFormItem>
            </ElForm>
        </ElCard>
    </div>
</template>


<style scoped>

/* 这里改背景颜色 */
.form:deep(.el-card) {
    background-color: rgb(253,232,175);
    border-radius: 15%;
}

.form:deep(.el-form-item__content) {
    padding: 0;
    margin: 0;
}

/* 这里改背景颜色和字色 */
.form:deep(.el-form-item__label) {
    color: rgb(251,189,23);  
    background-color: rgb(253,232,175);
}

/* 这里改按钮颜色和按钮字色 */
.form:deep(.el-button) {
    color: white;
    background-color: rgb(251,189,23);
}
.form{
    width: 25%;
}

.input{
    width: 50%;
}
.form:deep(.el-input) {
    width: 80%;
}
</style>