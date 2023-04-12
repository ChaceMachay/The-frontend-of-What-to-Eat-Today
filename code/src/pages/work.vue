<script setup>
import { useRouter } from "vue-router"

import { userLogout } from "../api/user"
import { getUserLoginInformation } from "../api/storage"
import { reloadStatus } from '../status/data'


const user = getUserLoginInformation()
const router = useRouter()

router.push('/')

if (reloadStatus.value) {
    reloadStatus.value = false
    location.reload()
}

</script>

<template>
    <el-container>
        <el-header p-0>
            <div flex items-center h="full" style="background: rgb(251,189,23)" w-screen>
                <div flex items-center grow ml-6>
                    <el-avatar src="/pics/logo.png" />
                    <span ml-2 c-white>"今天吃什么"数据管理系统</span>
                </div>
                <div mr-10>
                    <span>
                        <span c-white>
                            {{ user.userName }}
                        </span>
                    </span>
                    <span c-white ml-6 @click="userLogout">退出登录</span>
                </div>
            </div>
        </el-header>
        <el-main>
            <RouterView></RouterView>
        </el-main>
        <el-footer>
        </el-footer>
    </el-container>
</template>