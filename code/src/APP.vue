<script setup>
import { ref } from "vue"

import login from "./pages/login.vue"
import work from "./pages/work.vue"

import { getUserLoginInformation } from "./api/storage";

// 通过动态的本地存储，实现登录状态切换，status是 0 则是未登录
const mainPageStructList = [login, work]
const user = getUserLoginInformation()
console.log(user.value)

</script>

<template>
<div>
    <component :is="mainPageStructList[user.userLoginStatus]" />    
</div>
</template>