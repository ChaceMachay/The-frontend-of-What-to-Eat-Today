<script setup>
import { ref } from "vue"
import { range } from 'lodash'

import { addWindowStatus, canteenWindowsLimit, canteenLevelLimit, canteenWindowStatus } from "../../status/data.js"
import { getCampus } from "../../api/canteen.js"
import { closeWindows, convertToChinaNum } from "../../api/etc.js"

console.log("canteen add was loaded.")

//   添加基本上就是修改的操作，只是初始值为0. 只有与后端交互的api名字不同，叫pushAddData(); 状态为 addWindowStatus ， 其他一致。

const options = getCampus()

const userCanteenEditInput = ref({
    campus_id: "1",
    canteen_name: "齐园",
    level_num: 1,
    information: [{
        windows_num: 1,
        information: ["",],
    }]
})

const initialInput = () => {
    let template = {
        windows_num: 1,
        information: [],
    }
    for (let l in range(canteenWindowsLimit)) {
        template.information.push("")
    }
    console.log("template: ", userCanteenEditInput.value)
    for (let m in range(canteenLevelLimit)) {
        userCanteenEditInput.value.information.push(
            JSON.parse(JSON.stringify(template))
        )
    }
}

const userPrimaryCanteenEdit = () => {
    ElMessageBox.confirm("是否确认添加餐厅信息？", "添加确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(
            (res) => {
                const loading = ElLoading.service({
                    fullscreen: true,
                    text: "正在提交添加数据",
                })
                //pushAddData(userCanteenEditInput.value)
                loading.close()
                console.log("close then: ", res)
                ElMessageBox.confirm("添加餐厅信息成功！", "添加成功", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })

                console.log(userCanteenEditInput.value)
                addWindowStatus.value = false
            }
        )
        .catch((err) => {
            console.log("close catch", err)
            return
        })
}

console.log(range(5.5))

const userCloseCanteenEditWindow = () => {
    ElMessageBox.confirm("数据尚未保存，是否退出？", "返回确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            addWindowStatus.value = false
        })
        .catch(() => {
            return
        })
}

initialInput()
</script>

<template>
    <!-- 修改信息的层数和窗口数要做验证，包括不能为零，和单次而言input的数不能超过原值+limit值 -->


    <div class="dialog" v-if="canteenWindowStatus">
        <el-dialog v-model="addWindowStatus" :show-close="false" align-center :close-on-click-modal="false">
            <template #header>
                <div flex items-center h="full" bg-yellow-5><span c-white m-3>添加餐厅信息</span></div>
            </template>
            <el-container>
                <el-main style="overflow-x: hidden;overflow-y:auto;">
                    <div m-5 flex flex-row style="width: 100%;">
                        <div grow flex flex-row>
                            <span>校区：</span>
                            <el-select v-model="userCanteenEditInput.campus_id" size="large">
                                <el-option v-for="item in options" :key="item.campus_id" :label="item.campus_name"
                                    :value="item.campus_id" />
                            </el-select>
                        </div>
                        <div grow flex flex-row><span>名称：</span><el-input v-model="userCanteenEditInput.canteen_name" /></div>
                    </div>
                    <div m-5 flex style="width: 100%;" flex-row>
                        <div grow flex flex-row><span>层数：</span><el-input v-model.number="userCanteenEditInput.level_num" /></div>
                        <div grow></div>
                    </div>


                    <div m-5 flex flex-col style="width: 100%;" v-for="i in range(userCanteenEditInput.level_num)">
                        <div grow flex flex-row><span>第{{ convertToChinaNum(i + 1) }}层
                                窗口数：<el-input v-model.number="userCanteenEditInput.information[i].windows_num" /></span>
                        </div>
                        <div flex flex-col
                            v-for="j in range((userCanteenEditInput.information[i].windows_num + (userCanteenEditInput.information[i].windows_num) % 2) / 2)">
                            <div flex flex-row>
                                <div grow mt-5 mb-5 flex flex-row>
                                    <span>{{ j * 2 + 1 }}号窗口名称：<el-input
                                            v-model="userCanteenEditInput.information[i].information[j * 2]" /></span>
                                </div>
                                <div grow mt-5 mb-5 flex flex-row v-if="((j + 1) < ((userCanteenEditInput.information[i].windows_num + userCanteenEditInput.information[i].windows_num % 2) / 2))
                                    || !(userCanteenEditInput.information[i].windows_num % 2)">
                                    <span>{{ j * 2 + 2 }}号窗口名称：<el-input
                                            v-model="userCanteenEditInput.information[i].information[j * 2 + 1]" /></span>
                                </div>
                                <div grow="2" mt-5 mb-5 v-else></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div flex-row w="full">
                            <div grow>
                            </div>
                            <div grow>
                                <el-button @click="userPrimaryCanteenEdit">添加</el-button>
                                <el-button @click="userCloseCanteenEditWindow">返回</el-button>
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
    background-color: white;
    margin: 0;
}

.dialog:deep(.template) {
    background-color: white;
}

.dialog:deep(.el-dialog__body) {
    padding: 0;
    margin: 0;
}

.dialog:deep(.is-align-center) {
    width: 60%;
    max-height: 80%;
    min-height: 80%;
}

.dialog:deep(.el-button) {
    color: white;
    background-color: rgb(251, 189, 23);
}
</style>