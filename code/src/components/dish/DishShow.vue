<script setup>
import { ref } from "vue"
import { range } from 'lodash'

import { windowsMessage, showWindowStatus, dishWindowStatus } from "../../status/data.js"
import { convertToChinaNum, showDishDateChinese } from "../../api/etc.js"

console.log("dish show was loaded, and it message is: ",windowsMessage.value)

const userCloseDishShowWindow = () => {
            windowsMessage.value = null
            showWindowStatus.value = false
}

</script>

<template>
    <div class="dialog" v-if="dishWindowStatus">
        <el-dialog v-model="showWindowStatus" :show-close="false" align-center>
            <template #header>
                <div flex items-center h="full" bg-yellow-5><span c-white m-3>查看餐厅详情</span></div>
            </template>
            <el-container>
                <el-main style="overflow-x: hidden;">
                    <div m-5 flex flex-row style="width: 100%;">
                        <div grow><span>uid：</span><span>{{ windowsMessage.dish_id }}</span></div>
                        <div grow><span>名称：</span><span>{{ windowsMessage.dish_name }}</span></div>
                        <div grow><span>时间：</span><span>{{ showDishDateChinese(windowsMessage.date) }}</span></div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow><span>餐厅：</span><span>{{ windowsMessage.dish_id.slice(0,1) }}</span></div>
                        <div grow><span>楼层：</span><span>{{ windowsMessage.dish_id.slice(2,4) }}</span></div>
                        <div grow><span>窗口号：</span><span>{{ windowsMessage.windows_id }}</span></div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow><span>清真：</span><el-checkbox v-model="windowsMessage.muslim" disabled></el-checkbox></div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow><span>标签：</span><span>{{ windowsMessage.dish_id.slice(0,1) }}</span></div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow><span>图片：</span><span>{{ windowsMessage.dish_id.slice(0,1) }}</span></div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow><span>备用图片：</span><span>{{ windowsMessage.dish_id.slice(0,1) }}</span></div>
                    </div>
                    <div>
                        <div flex-row w="full">
                            <div grow></div>
                            <div grow>
                                <el-button @click="userCloseDishShowWindow">返回</el-button>
                            </div>
                            <div grow></div>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-dialog>
    </div>
</template>

<style scoped>
.dialog:deep(.el-dialog__header) {
    padding: 0;
    margin: 0;
}

.dialog:deep(.el-main) {
    padding: 0;
    margin: 0;
}

.dialog:deep(.el-dialog__body) {
    padding: 0;
    margin: 0;
}
</style>