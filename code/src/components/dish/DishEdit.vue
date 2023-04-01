<script setup>
import { ref } from "vue"
import { range } from 'lodash'

import { windowsMessage, editWindowStatus, canteenWindowsLimit, canteenLevelLimit, dishWindowStatus } from "../../status/data.js"
import { getCampus } from "../../api/canteen.js"
import { convertToChinaNum } from "../../api/etc.js"

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
    }

    userCanteenEditInput.value.information = windowsMessage.value.information.map(i => {
        let temp = {
            windows_num: i.windows_num,
            information: i.information.map(j => j.windows_name)
        }
        for (let k in range(canteenWindowsLimit)) {
            temp.information.push("")
        }
        return temp
    })
    let template = {
        windows_num: 1,
        information: [],
    }
    for (let l in range(canteenWindowsLimit)) {
        template.information.push("")
    }
    for (let m in range(canteenLevelLimit)) {
        userCanteenEditInput.value.information.push(
            JSON.parse(JSON.stringify(template))
        )
    }
}

const userPrimaryCanteenEdit = () => {
    ElMessageBox.confirm("是否确认修改餐厅信息？", "修改确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(
            (res) => {
                const loading = ElLoading.service({
                    fullscreen: true,
                    text: "正在提交修改数据",
                })
                //pushEditData(userCanteenEditInput.value)
                loading.close()
                console.log("close then: ", res)
                ElMessageBox.confirm("修改餐厅信息成功！", "修改成功", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })

                console.log(userCanteenEditInput.value)
                windowsMessage.value = null
                editWindowStatus.value = false
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
            windowsMessage.value = null
            editWindowStatus.value = false
        })
        .catch(() => {
            return
        })
}

initialInput()
</script>

<template>
    <!-- 修改信息的层数和窗口数要做验证，包括不能为零，和单次而言input的数不能超过原值+limit值 -->


    <div class="dialog" v-if="dishWindowStatus">
        <el-dialog v-model="editWindowStatus" :show-close="false" align-center :close-on-click-modal="false">
            <template #header>
                <div flex items-center h="full" bg-yellow-5><span c-white m-3>修改餐厅信息</span></div>
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
                        <div grow><span>名称：</span><el-input v-model="userCanteenEditInput.canteen_name" /></div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow><span>层数：</span><el-input v-model.number="userCanteenEditInput.level_num" /></div>
                        <div grow></div>
                    </div>


                    <div m-5 flex flex-col style="width: 100%;" v-for="i in range(userCanteenEditInput.level_num)">
                        <div grow><span>第{{ convertToChinaNum(i + 1) }}层
                                窗口数：<el-input v-model.number="userCanteenEditInput.information[i].windows_num" /></span>
                        </div>
                        <div flex flex-col
                            v-for="j in range((userCanteenEditInput.information[i].windows_num + (userCanteenEditInput.information[i].windows_num) % 2) / 2)">
                            <div flex flex-row>
                                <div grow mt-5 mb-5>
                                    <span>{{ j * 2 + 1 }}号窗口名称：<el-input
                                            v-model="userCanteenEditInput.information[i].information[j * 2]" /></span>
                                </div>
                                <div grow mt-5 mb-5 v-if="((j + 1) < ((userCanteenEditInput.information[i].windows_num + userCanteenEditInput.information[i].windows_num % 2) / 2))
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
                                <el-button @click="userPrimaryCanteenEdit">修改</el-button>
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