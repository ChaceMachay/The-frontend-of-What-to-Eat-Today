<script setup>
import { ref, computed } from "vue"
import { range } from 'lodash'

import { windowsMessage, editWindowStatus, dishWindowStatus } from "../../status/data.js"
//import { getWindows } from "../../api/dish.js"
import { showDishDateChinese } from "../../api/etc.js"


import { getWindows } from "../../test/api/dish.js"

console.log("dish edit was loaded, and it message is: ", windowsMessage.value)

const options = getWindows()

const labelList = ref([{ 'labelName': '汤类', "labelClass": "green" }, { "labelName": '辣', "labelClass": "red" }, { "labelName": "+", "labelClass": "yellow" }])

const userDishEditInput = ref({
    "dish_name": "红烧兔头",
    "dish_id": "010101001",
    "muslim": false,
    "windows_id": "010101",
    "label": [],
    "picture": "https://img1.baidu.com/it/u=1831000000,1831000000&fm=26&fmt=auto&gp=0.jpg",
    "sparePicture": "https://img1.baidu.com/it/u=1831000000,1831000000&fm=26&fmt=auto&gp=0.jpg",
    'date': {
        "morning": false,
        "noon": false,
        "night": false,
    },

}
)

userDishEditInput.value = JSON.parse(JSON.stringify(windowsMessage.value))

const canteenList = computed(() => {
    let i = 0
    return options.map(a => {
        return {
            value: i++,
            label: a.canteen_name
        }
    })
})

const canteenIndex = ref(0)
canteenIndex.value = userDishEditInput.value.dish_id.slice(1, 2) - 1

const levelList = computed(() => {
    let i = -1
    return options[canteenIndex.value].level.map(a => {
        i++
        return {
            value: i,
            label: a.level_num
        }
    })
})

const levelIndex = ref(0)
levelIndex.value = options[canteenIndex.value].level.findIndex(a => a.level_num === Number(userDishEditInput.value.dish_id.slice(2, 4)))
const windowsList = computed(() => {
    return options[canteenIndex.value].level[levelIndex.value].windows.map(a => {
        return {
            value: a.windows_id,
            label: a.windows_num
        }
    })
})

const userPrimaryDishEdit = () => {
    ElMessageBox.confirm("是否确认修改菜品信息？", "修改确认", {
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
                //pushEditData(userDishEditInput.value)
                loading.close()
                console.log("close then: ", res)
                ElMessageBox.confirm("修改菜品信息成功！", "修改成功", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })

                console.log(userDishEditInput.value)
                windowsMessage.value = null
                editWindowStatus.value = false
                dishWindowStatus.value = false
            }
        )
        .catch((err) => {
            console.log("close catch", err)
            return
        })
}

const userCloseDishEditWindow = () => {
    console.log("close")
    ElMessageBox.confirm("数据尚未保存，是否退出？", "返回确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            windowsMessage.value = null
            editWindowStatus.value = false
            dishWindowStatus.value = false
        })
        .catch(() => {
            return
        })
}





</script>

<template>
    <div class="dialog" v-if="dishWindowStatus">
        <el-dialog v-model="editWindowStatus" :show-close="false" align-center :close-on-click-modal="false">
            <template #header>
                <div flex items-center h="full" bg-yellow-5><span c-white m-3>修改菜品信息</span></div>
            </template>
            <el-container>
                <el-main style="overflow-x: hidden;">
                    <div m-5 flex flex-row style="width: 100%;">
                        <div grow><span>uid：</span><span>{{ windowsMessage.dish_id }}</span></div>
                        <div grow><span>名称：</span><input v-model="userDishEditInput.dish_name" /></div>
                        <div grow flex flex-row><span>时间：</span>
                            <el-checkbox v-model="userDishEditInput.date.morning" label="早"></el-checkbox>
                            <el-checkbox v-model="userDishEditInput.date.noon" label="中"></el-checkbox>
                            <el-checkbox v-model="userDishEditInput.date.night" label="晚"></el-checkbox>
                        </div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow>
                            <span>餐厅：</span>
                            <el-select v-model="canteenIndex">
                                <el-option v-for="item in canteenList" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                        <div grow>
                            <span>楼层：</span>
                            <el-select v-model="levelIndex">
                                <el-option v-for="item in levelList" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                        <div grow>
                            <span>窗口号：</span>
                            <el-select v-model="userDishEditInput.windows_id">
                                <el-option v-for="item in windowsList" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow><span>清真：</span><el-checkbox v-model="userDishEditInput.muslim"></el-checkbox></div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow flex flex-row>
                            <span>标签：</span>
                            <div c-white rd m-1 v-for="item in labelList" :class="item.labelClass"><span
                                    class="label-text">{{ item.labelName }}</span></div>
                        </div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow flex flex-row><span>图片：</span>
                            <el-upload :action="fileUploadURL" :limit="1" :on-exceed="handleExceed" ref="upload" >
                                <template #trigger>
                                    <el-button type="primary">上传</el-button>
                                </template>
                            </el-upload>
                        </div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow flex flex-row><span>备用图片：</span>
                            <el-upload :action="fileUploadURL" :limit="1" :on-exceed="handleExceed" ref="upload">
                                <template #trigger>
                                    <el-button type="primary">上传</el-button>
                                </template>
                            </el-upload></div>
                    </div>
                    <div>
                        <div flex-row w="full">
                            <div grow></div>
                            <div grow>
                                <el-button @click="userPrimaryDishEdit">修改</el-button>
                                <el-button @click="userCloseDishEditWindow">返回</el-button>
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

.label-text {
    margin: 1rem;
    margin-top: 1.5rem;
}

.green {
    background-color: #67C23A;
}

.red {
    background-color: #F56C6C;
}

.yellow {
    background-color: #E6A23C;
}
</style>