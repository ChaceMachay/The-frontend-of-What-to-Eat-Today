<script setup> 
import { ref } from "vue"
import { range } from 'lodash'

import { windowsMessage, showWindowStatus, canteenWindowStatus } from "../../status/data.js"
import { convertToChinaNum } from "../../api/etc.js"

console.log("canteen show was loaded, and it message is: ",windowsMessage.value)

const userCloseCanteenShowWindow = () => {
            canteenWindowStatus.value = false
            windowsMessage.value = null
            showWindowStatus.value = false
}


</script>

<template>
    <div class="dialog" v-if="canteenWindowStatus">
        <el-dialog v-model="showWindowStatus" :show-close="false" align-center :before-close="userCloseCanteenShowWindow">
            <template #header>
                <div flex items-center h="full" bg-yellow-5><span c-white m-3>查看餐厅详情</span></div>
            </template>
            <el-container>
                <el-main style="overflow-x: hidden;">
                    <div m-5 flex flex-row style="width: 100%;">
                        <div grow><span>校区：</span><span>{{ windowsMessage.campus.campus_name }}</span></div>
                        <div grow><span>名称：</span><span>{{ windowsMessage.canteen_name }}</span></div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow><span>层数：</span><span>{{ windowsMessage.level_num }}</span></div>
                        <div grow></div>
                    </div>
                    <div m-5 flex flex-col style="width: 100%;" v-for="level in windowsMessage.information">
                        <div grow><span>第{{ convertToChinaNum(level.level_id.substring(2, 4)) }}层
                                窗口数：{{ level.windows_num }}</span></div>
                        <div flex flex-col v-for="i in range((level.windows_num + level.windows_num%2 )/2)">
                            <div flex flex-row>
                                <div grow mt-5 mb-5 >
                                    <span>{{ level.information[i*2].windows_id.substring(4, 7) * 1 }}号窗口名称：{{ level.information[i*2].windows_name }}</span>
                                </div>
                                <div grow mt-5 mb-5 v-if="(i!==(level.windows_num + level.windows_num%2 )/2-1)||!(level.windows_num%2)">
                                    <span>{{ level.information[i*2+1].windows_id.substring(4, 7) * 1 }}号窗口名称：{{ level.information[i*2+1].windows_name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div flex-row w="full">
                            <div grow>
                            </div>
                            <div grow>
                                <el-button @click="userCloseCanteenShowWindow">返回</el-button>
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