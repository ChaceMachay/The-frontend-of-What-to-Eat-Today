<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { showWindowStatus, editWindowStatus,addWindowStatus, windowStatus, canteenWindowStatus } from "../status/data"
//import { getCanteenInformationByPage, getCanteenInformationBySearch } from "../api/canteen"

import { getCanteenInformationByPage, getCanteenInformationBySearch } from "../test/api/canteen"

import CanteenShow from "../components/canteen/CanteenShow.vue"
import CanteenEdit from "../components/canteen/CanteenEdit.vue"
import CanteenAdd from "../components/canteen/CanteenAdd.vue"
import Operations from "../components/Operations.vue"

const router = useRouter()
const nowPage = ref(1)
const itemHeight = ref(20)
const userSearchInput = ref("")
const userFilterInput = ref([])
const qty = computed(() => {
    return document.body.clientHeight / 100 * 60 / itemHeight.value
})
const canteenInformation = ref([])

canteenInformation.value = getCanteenInformationByPage(nowPage.value, qty.value)


const nextPage = async () => {
    try {
        canteenInformation.value = getCanteenInformationByPage(nowPage.value + 1, qty.value)
    }
    catch {
        alert("已经是最后一页了")
        return
    }
    nowPage.value += 1
}

const lastPage = async () => {
    try {
        canteenInformation.value = getCanteenInformationByPage(nowPage.value - 1, qty.value)
    }
    catch {
        alert("已经是第一页了")
        return
    }
    nowPage.value -= 1
}

const search = async () => {
    const loading = ElLoading.service({
        fullscreen: true,
        text: "正在搜索",
    })
    try {
        canteenInformation.value = getCanteenInformationBySearch(userSearchInput.value, 1, qty.value)
        userSearchInput.value = null
    }
    catch {
        loading.close()
        alert("没有找到相关信息")
        return
    }
    loading.close()
    nowPage.value = 1
}

const userAddCanteen = () => {
    if (windowStatus.value) {
        return
    }
    canteenWindowStatus.value = true
    addWindowStatus.value = true
    console.log("addItem was called. ")
}

</script>

<template>
    <CanteenShow v-if="showWindowStatus" />
    <CanteenEdit v-if="editWindowStatus" />
    <CanteenAdd  v-if="addWindowStatus" />


    <!-- 表格的上下页检验和样式没做。 -->


    <el-container class="div">
        <el-header flex flex-row style="justify-content: space-between;" item-center>
            <div>餐厅管理</div>
            <div flex flex-row>
                <el-input v-model="userSearchInput"></el-input>
                <el-button @click="search">搜索</el-button>
                <el-button>筛选</el-button>
                <el-button @click="router.push('/')">返回</el-button>
            </div>
        </el-header>
        <el-main>
            <el-table :data="canteenInformation">
                <el-table-column label="校区" grow="1">
                    <template #default="scope">
                        {{ scope.row.campus.campus_name }}
                    </template>
                </el-table-column>
                <el-table-column label="名称" grow="5">
                    <template #default="scope">
                        {{ scope.row.canteen_name }}
                    </template>
                </el-table-column>
                <el-table-column label="管理" grow="1">
                    <template #default="scope">
                        <Operations :item="scope.row" type="canteen" />
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <el-button @click="lastPage">上一页</el-button>
            <el-button @click="nextPage">下一页</el-button>
        </el-footer>
    </el-container>
    <div style="position: absolute; border-radius: 100%; width:4rem; height: 4rem;bottom: 5rem;right:5rem;" bg-yellow-5
        @click="userAddCanteen"></div>
</template>


<style scoped>
.div:deep(.el-input) {
    height: 55%;
    margin-right: 5%;
}
</style>