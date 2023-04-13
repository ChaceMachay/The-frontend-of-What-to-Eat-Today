<script setup>
import { ref} from "vue"
import { useRouter } from "vue-router"
import { showCanteenWindowStatus, editCanteenWindowStatus,addCanteenWindowStatus, windowStatus,
    canteenInformation, nowCanteenPage, allCanteenPage} from "../status/data"

import { initialCanteenManangeInformation,nextPage,lastPage } from "../api/canteen"


import CanteenShow from "../components/canteen/CanteenShow.vue"
import CanteenEdit from "../components/canteen/CanteenEdit.vue"
import CanteenAdd from "../components/canteen/CanteenAdd.vue"
import Operations from "../components/Operations.vue"

const router = useRouter()
const userSearchInput = ref("")
//const userFilterInput = ref([])

const userAddCanteen = () => {
    if (windowStatus.value) {
        return
    }
    addCanteenWindowStatus.value = true
}

nowCanteenPage.value = 1
initialCanteenManangeInformation()

</script>

<template>
  <CanteenShow v-if="showCanteenWindowStatus" />
  <CanteenEdit v-if="editCanteenWindowStatus" />
  <CanteenAdd v-if="addCanteenWindowStatus" />

  <!-- 表格的上下页检验和样式没做。 -->

  <el-container class="div">
    <el-header flex flex-row style="justify-content: space-between" item-center>
      <div>餐厅管理</div>
      <div flex flex-row>
        <el-input v-model="userSearchInput"></el-input>
        <el-button @click="search" class="btn-above">搜索</el-button>
        <el-button class="btn-above">筛选</el-button>
        <el-button @click="router.push('/')" class="btn-above">返回</el-button>
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
      <el-button>{{ nowCanteenPage }} / {{ allCanteenPage }}</el-button>
      <el-button @click="nextPage">下一页</el-button>
    </el-footer>
  </el-container>
  <div
    style="
      position: fixed;
      z-index: 100; 
      border-radius: 100%;
      width: 4rem;
      height: 4rem;
      bottom: 5rem;
      right: 5rem;
    "
    bg-yellow-5
    @click="userAddCanteen"
  >
  <el-avatar
      src="/pics/add.png"
      style="
        position: relative;
        border-radius: 100%;
        width: 4rem;
        height: 4rem;
        bottom: 0rem;
        right: 0rem; ;
      "
    />
  </div>
</template>

<style scoped>
.div:deep(.el-input) {
  height: 55%;
  margin-right: 5%;
}

.div:deep(.el-button) {
  position: relative;
}

.btn-above {
    color: white;
    background-color: rgb(251, 189, 23);
}
</style>
