<script setup>
import { ref } from "vue"
import { range } from 'lodash'

import { windowsMessage, editWindowStatus } from "../status/data.js"
import { getCampus } from "../api/canteen"
import { convertToChinaNum } from "../api/etc"

console.log("canteen edit was loaded, and it message is: ", windowsMessage.value)

const options = getCampus()

const userCanteenEditInput = ref({
    campus_id: "",
    canteen_name: "",
    level_num: 1,
    information: [{
        windows_num: 1,
        information: ["",],
    }]
})

const initialInput = () => {
    userCanteenEditInput.value = {
        campus_id: windowsMessage.value.campus.campus_id,
        canteen_name: windowsMessage.value.canteen_name,
        level_num: windowsMessage.value.level_num,
        information: []
    }

    userCanteenEditInput.value.information = windowsMessage.value.information.map(i => {
        return {
            windows_num: i.windows_num,
            information: i.information.map(j => j.windows_name)
        }
    })
}

initialInput()
//console.log( userCanteenEditInput.value.information[range(userCanteenEditInput.value.level_num)[0]].windows_num)
</script>

<template>
    <div class="dialog" v-if="editWindowStatus" >
        <el-dialog v-model="editWindowStatus" :show-close="false" align-center>
            <template #header>
                <div flex items-center h="full" bg-yellow-5><span c-white m-3>修改餐厅信息</span></div>
            </template>
            <el-container>
                <el-main style="overflow-x: hidden;">
                    <div m-5 flex flex-row style="width: 100%;">
                        <div grow flex flex-row>
                            <span>校区：</span>
                            <el-select v-model="userCanteenEditInput.campus_id" size="large">
                                <el-option v-for="item in options" :key="item.campus_id" :label="item.campus_name"
                                    :value="item.campus_id" />
                            </el-select>
                        </div>
                        <div grow><span>名称：</span><el-input v-model="userCanteenEditInput.canteen_name" /></div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow><span>层数：</span><el-input v-model="userCanteenEditInput.level_num" /></div>
                        <div grow></div>
                    </div>


                    <div m-5 flex flex-col style="width: 100%;" v-for="i in range(userCanteenEditInput.level_num)">
                        <div grow><span>第{{ convertToChinaNum(i + 1) }}层
                                窗口数：<el-input v-model="userCanteenEditInput.information[i].windows_num" /></span></div>
                        <div flex flex-col
                            v-for="j in range((userCanteenEditInput.information[i].windows_num + userCanteenEditInput.information[i].windows_num % 2) / 2)">
                            <div flex flex-row>
                                <div grow mt-5 mb-5>
                                    <span>{{ j * 2 + 1 }}号窗口名称：<el-input
                                            v-model="userCanteenEditInput.information[i].information[j * 2]" /></span>
                                </div>
                                <div grow mt-5 mb-5
                                    v-if="(i !== (userCanteenEditInput.information[i].windows_num + userCanteenEditInput.information[i].windows_num % 2) / 2)
                                       || !(userCanteenEditInput.information[i].windows_num % 2)">
                                    <span>{{ j * 2 + 2 }}号窗口名称：<el-input
                                            v-model="userCanteenEditInput.information[i].information[j * 2 + 1]" /></span>
                                </div>
                            </div>
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

.dialog:deep(.is-align-center) {
    width: 60%;
    height: 80%;
}</style>