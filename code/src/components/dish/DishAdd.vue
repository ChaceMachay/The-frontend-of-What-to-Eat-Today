<script setup>
import { ref, computed } from "vue"

import { addDishWindowStatus } from "../../status/data.js"
//import { getWindows } from "../../api/dish.js"
import { showDishDateChinese } from "../../api/etc.js"


import { getWindows} from "../../test/api/dish.js"

import DishUpload from "./DishUpload.vue"

const url = 'https://0nlinetek-eat.azurewebsites.net'

const options = getWindows()

const labelList = ref([{ 'labelName': '汤类', "labelClass": "green" }, { "labelName": '辣', "labelClass": "red" }, { "labelName": "+", "labelClass": "yellow" }])

const userDishAddInput = ref({
    "dish_name": "待定",
    "muslim": false,
    "windows_id": "110101",
    "label": [],
    "picture": "",
    "sparePicture": "",
    'date': {
        "morning": false,
        "noon": false,
        "night": false,
    },

}
)

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
const levelIndex = ref(0)
canteenIndex.value = userDishAddInput.value.windows_id.slice(1, 2) - 1

const levelList = computed(() => {
    levelIndex.value = 0
    let i = -1
    return options[canteenIndex.value].level.map(a => {
        i++
        return {
            value: i,
            label: a.level_num
        }
    })
})

levelIndex.value = options[canteenIndex.value].level.findIndex(a => a.level_num === Number(userDishAddInput.value.windows_id.slice(2, 4)))
const windowsList = computed(() => {
    userDishAddInput.value.windows_id = options[canteenIndex.value].level[levelIndex.value].windows[0].windows_id
    return options[canteenIndex.value].level[levelIndex.value].windows.map(a => {
        return {
            value: a.windows_id,
            label: a.windows_num
        }
    })
})

const userPrimaryDishAdd = () => {
    ElMessageBox.confirm("是否确认添加菜品信息？", "添加确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(
            (res) => {
                if (!checkStatus.value) {
                    ElMessageBox.confirm("菜品名称不能为空！", "添加失败", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                    checkWarnAdd()
                    return
                }
                const loading = ElLoading.service({
                    fullscreen: true,
                    text: "正在提交数据",
                })
                //pushAddData(userDishAddInput.value)
                loading.close()
                console.log("close then: ", res)
                ElMessageBox.confirm("添加菜品信息成功！", "添加成功", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                addDishWindowStatus.value = false
            }
        )
        .catch((err) => {
            console.log("close catch", err)
            return
        })
}

const userCloseDishAddWindow = () => {
    console.log("close")
    ElMessageBox.confirm("数据尚未保存，是否退出？", "返回确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            addDishWindowStatus.value = false
        })
        .catch(() => {
            return
        })
}

const checkStatus = ref(true)
function checkWarnAdd() {
    checkStatus.value = false
    let i = document.getElementById("nameJS")
    i.classList.add("name")
}
function checkWarnRemove() {
    checkStatus.value = true
    let i = document.getElementById("nameJS")
    i.classList.remove("name")
}

function inputNesCheck(e) {
    let value = e.target.value
    console.log(value)
    if (value === "") {
        checkWarnAdd()
    } else {
        checkWarnRemove()
    }
}

</script>

<template>
    <div class="dialog">
        <el-dialog v-model="addDishWindowStatus" :show-close="false" align-center :close-on-click-modal="false"
            append-to-body>
            <template #header>
                <div flex items-center h="full" bg-yellow-5><span c-white m-3>添加菜品信息</span></div>
            </template>
            <el-container>
                <el-main style="overflow-x: hidden;">
                    <div m-5 flex flex-row style="width: 100%;">
                        <div grow id="nameJS"><span>名称：</span><el-input @focus="checkWarnRemove" @blur="inputNesCheck"
                                v-model="userDishAddInput.dish_name" /></div>
                        <div grow flex flex-row><span>时间：</span>
                            <el-checkbox v-model="userDishAddInput.date.morning" label="早"></el-checkbox>
                            <el-checkbox v-model="userDishAddInput.date.noon" label="中"></el-checkbox>
                            <el-checkbox v-model="userDishAddInput.date.night" label="晚"></el-checkbox>
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
                            <el-select v-model="userDishAddInput.windows_id">
                                <el-option v-for="item in windowsList" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow><span>清真：</span><el-checkbox v-model="userDishAddInput.muslim"></el-checkbox></div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow flex flex-row>
                            <span>标签：</span>
                            <div c-white rd m-1 v-for="item in labelList" :class="item.labelClass"><span
                                    class="label-text">{{ item.labelName }}</span></div>
                        </div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow flex flex-row>
                            <span>展示图片：</span>
                            <DishUpload :picture-url="userDishAddInput.picture" @update:picture-url="(i)=>userDishAddInput.picture = i" />
                        </div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow flex flex-row><span>备用图片：</span>
                            <DishUpload :picture-url="userDishAddInput.sparePicture" @update:picture-url='(i)=>userDishAddInput.sparePicture = i' />
                        </div>
                    </div>
                    <div>
                        <div flex-row w="full">
                            <div grow></div>
                            <div grow>
                                <el-button @click="userPrimaryDishAdd">修改</el-button>
                                <el-button @click="userCloseDishAddWindow">返回</el-button>
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

.name :deep(.el-input__wrapper) {
    box-shadow: red 0px 0px 0px 1px inset !important;
}
</style>