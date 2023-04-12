<script setup>  
import LoginForm from "../childPages/LoginForm.vue"

</script>

<template>
<el-container h-screen>
            <el-header p-0>
                <div flex items-center h="full" style="background: rgb(251,189,23);" w-screen>
                    <div grow></div>
                    <el-avatar  src="/pics/logo.png" />
                    <span ml-2 c-white>"今天吃什么"数据管理系统</span>
                    <div grow></div>
                </div>
            </el-header>
            <el-main flex style="align-items: center;">
                <LoginForm style="margin: 0 auto;" />
            </el-main>
        </el-container>
</template>