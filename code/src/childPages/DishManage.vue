<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { showDishWindowStatus, editDishWindowStatus, addDishWindowStatus, windowStatus } from "../status/data"
//import { getDishInformationByPage, getDishInformationBySearch } from "../api/dish"
import { showDishDateChinese } from "../api/etc"

import { getDishInformationByPage, getDishInformationBySearch, getWindows } from "../test/api/dish"

import DishShow from "../components/dish/DishShow.vue"
import DishEdit from "../components/dish/DishEdit.vue"
import DishAdd from "../components/dish/DishAdd.vue"
import Operations from "../components/Operations.vue"

const windows = ref()
windows.value = getWindows()
const router = useRouter()
const nowPage = ref(1)
const itemHeight = ref(20)
const userSearchInput = ref("")
const userFilterInput = ref([])
const qty = computed(() => {
    return document.body.clientHeight / 100 * 60 / itemHeight.value
})
const dishInformation = ref([])

dishInformation.value = getDishInformationByPage(nowPage.value, qty.value)


const nextPage = async () => {
    try {
        dishInformation.value = getDishInformationByPage(nowPage.value + 1, qty.value)
    }
    catch {
        alert("已经是最后一页了")
        return
    }
    nowPage.value += 1
}

const lastPage = async () => {
    try {
        dishInformation.value = getDishInformationByPage(nowPage.value - 1, qty.value)
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
        dishInformation.value = getDishInformationBySearch(userSearchInput.value, 1, qty.value)
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
const userAddDish = () => {
    if (windowStatus.value) {
        return
    }
    addDishWindowStatus.value = true
    console.log("addItem was called. ")
}

</script>

<template>
    <DishShow v-if="showDishWindowStatus" />
    <DishEdit v-if="editDishWindowStatus" />
    <DishAdd v-if="addDishWindowStatus" />


    <!-- 提交表单的规则检查。（两个系统）
         还有图片相关的功能没做。
    -->


    <el-container class="div">
        <el-header flex flex-row style="justify-content: space-between;" item-center>
            <div>菜品管理</div>
            <div flex flex-row>
                <el-input v-model="userSearchInput"></el-input>
                <el-button @click="search">搜索</el-button>
                <el-button>筛选</el-button>
                <el-button @click="router.push('/')">返回</el-button>
            </div>
        </el-header>
        <el-main>
            <el-table :data="dishInformation">
                <el-table-column label="uid" grow="1">
                    <template #default="scope">
                        {{ scope.row.dish_id }}
                    </template>
                </el-table-column>
                <el-table-column label="名称" grow="5">
                    <template #default="scope">
                        {{ scope.row.dish_name }}
                    </template>
                </el-table-column>
                <el-table-column label="地点" grow="1">
                    <template #default="scope">
                        {{ windows[Number(scope.row.dish_id.slice(0, 1))].canteen_name }}-{{ scope.row.dish_id.slice(1, 2) }}-{{ scope.row.dish_id.slice(2, 4) }}-{{ scope.row.dish_id.slice(4, 6) }}-{{ scope.row.dish_name }}
                    </template>
                </el-table-column>
                <el-table-column label="时间" grow="1">
                    <template #default="scope">
                        {{showDishDateChinese(scope.row.date)}}
                    </template>
                </el-table-column>
                <el-table-column label="管理" grow="1">
                    <template #default="scope">
                        <Operations :item="scope.row" type="dish" />
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <div flex flex-row>
            <el-button @click="lastPage">上一页</el-button>
            <div>{{nowPage}}</div>
            <el-button @click="nextPage">下一页</el-button>
            </div>
        </el-footer>
    </el-container>
    <div style="position: absolute; border-radius: 100%; width:4rem; height: 4rem;bottom: 5rem;right:5rem;" bg-yellow-5
        @click="userAddDish"></div>
</template>


<style scoped>
.div:deep(.el-input) {
    height: 55%;
    margin-right: 5%;
}
</style>