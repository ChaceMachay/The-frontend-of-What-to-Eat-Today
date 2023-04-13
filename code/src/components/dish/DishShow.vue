<script setup>

import { ref } from "vue"
import { windowsMessage, showDishWindowStatus, baseUrl,windowsList } from "../../status/data.js"
import { showDishDateChinese,convertToChinaNum } from "../../api/etc.js"


const labelList = ref([{ 'labelName': '汤类', "labelClass": "green" }, { "labelName": '辣', "labelClass": "red" }])

const showDishData = ref()
showDishData.value = JSON.parse(JSON.stringify(windowsMessage.value))

const userCloseDishShowWindow = () => {
    showDishWindowStatus.value = false
}
function getIndex(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].canteen_id == val) return i;
    }
    return -1
}
</script>

<template>
    <div class="dialog">
        <el-dialog v-model="showDishWindowStatus" :show-close="false" align-center append-to-body>
            <template #header>
                <div flex items-center h="full" bg-yellow-5><span c-white m-3>查看菜品详情</span></div>
            </template>
            <el-container class="container" m-4>
                <el-main style="overflow-x: hidden;">
                    <div m-5 flex flex-row style="width: 100%;">
                        <div grow><span>uid: </span><span>{{ showDishData.dish_id }}</span></div>
                        <div grow><span>&ensp;&ensp;&ensp;名称：</span><span>{{ showDishData.dish_name }}</span></div>
                        <div grow><span>时间：</span><span>{{ showDishDateChinese(showDishData.date) }}</span></div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow><span>餐厅：</span><span>{{ windowsList[getIndex(windowsList,showDishData.dish_id.slice(0, 2))].canteen_name }}</span></div>
                        <div grow><span>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;楼层：</span><span>{{ convertToChinaNum(showDishData.dish_id.slice(2, 4)) }}层</span></div>
                        <div grow><span>&ensp;&ensp;窗口号：</span><span>{{ showDishData.windows_id.slice(4, 6)*1 }}号窗口</span></div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow><span>清真：</span><el-checkbox v-model="showDishData.muslim" disabled></el-checkbox></div>
                        <div grow><span>价格：</span><span>{{ showDishData.price }}元</span></div>
                        <div grow></div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow flex flex-row>
                            <span mt-1>标签：</span>
                            <div c-white rd m-1 v-for="item in labelList" :class="item.labelClass"><span
                                    class="label-text">{{ item.labelName }}</span></div>
                        </div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow><span>图片：</span>
                            <el-card class="card" shadow>
                                <div h="100%">
                                    <div style="margin: 1rem;" flex items-center>
                                        <el-image :src="baseUrl + showDishData.picture" style="height: 15vh" :fit="cantain"
                                            :preview-src-list="[baseUrl + showDishData.picture,]" />
                                        <div flex flex-col>
                                            <span grow v-if="showDishData.picture"
                                                style="margin-left: 1rem;">点击图片可预览大图</span>
                                            <span grow v-else
                                                style="margin-left: 1rem;">尚未上传</span>
                                        </div>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </div>
                    <div m-5 flex style="width: 100%;">
                        <div grow><span>备用图片：</span>
                            <el-card class="card" shadow>
                                <div h="100%">
                                    <div style="margin: 1rem;" flex items-center>
                                        <el-image :src="baseUrl + showDishData.sparePicture" style="height: 15vh" :fit="cantain"
                                            :preview-src-list="[baseUrl + showDishData.sparePicture,]" />
                                        <div flex flex-col>
                                            <span grow v-if="showDishData.sparePicture"
                                                style="margin-left: 1rem;">点击图片可预览大图</span>
                                                
                                            <span grow v-else
                                                style="margin-left: 1rem;">尚未上传</span>
                                        </div>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </div>
                    <div>
                        <div m-1 flex style="width: 100%;">
                            <div flex-row w="full">
                                <div grow></div>
                                <div grow>
                                    <el-button bg-yellow-5 style="color: white; position: relative; left: 2rem; bottom: 1rem;" @click="userCloseDishShowWindow">返回</el-button>
                                </div>
                                <div grow></div>
                            </div>
                        </div>
                    </div>
                </el-main>
            </el-container>
        </el-dialog>
    </div>
</template>

<style scoped>
.dialog:deep(.el-dialog) {
    margin: 0;
}
.container:deep(.el-card__body) {
    padding: 0;
}

.dialog:deep(.el-dialog__header) {
    padding: 0!important;
    margin: 0;
}

.dialog:deep(.el-main) {
    padding: 0;
    padding-left: 0;
    margin: 0;
}

.dialog:deep(.el-dialog__body) {
    padding: 0;
    margin: 0;
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

.card {
    height: 20vh;
    margin: 1.5vw;
    width: 35vw;
}

.dialog:deep(.el-button) {
    color: white;
    background-color: rgb(251, 189, 23);
    position: relative;
    left: 1rem;
}
</style>