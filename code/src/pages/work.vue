<script setup>
import { ref } from "vue"
</script>

<template>
    <el-container>
        <el-header>
            <div flex items-center h="full" bg-yellow-5 w-screen>
                <div flex items-center grow ml-6>
                    <el-avatar src="../../public/pics/icon.jpg" />
                    <span ml-2 c-white>"今天吃什么"数据管理系统</span>
                </div>
                <div mr-10>
                    <template v-if="true">
                        <span>
                            <span c-white>
                                XXX
                            </span>
                        </span>
                        <span c-white ml-6>退出登录</span>
                    </template>
                    <span v-else c-white mr-10>
                        登录
                    </span>
                </div>
            </div>
        </el-header>
        <el-main>
        </el-main>
        <el-footer>
        </el-footer>
    </el-container>
</template>