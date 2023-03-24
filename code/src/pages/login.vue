<script setup> 
import { ref } from "vue"

import loginform from "../pagelittles/loginform.vue";

</script>

<template>
<el-container h-screen>
            <el-header p-0>
                <div flex items-center h="full" bg-yellow-5 w-screen>
                    <div grow></div>
                    <el-avatar  src="../../public/pics/icon.jpg" />
                    <span ml-2 c-white>"今天吃什么"数据管理系统</span>
                    <div grow></div>
                </div>
            </el-header>
            <el-main flex style="align-items: center;">
                <loginform style="margin: 0 auto;" />
            </el-main>
        </el-container>
</template>