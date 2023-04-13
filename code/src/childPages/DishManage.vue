<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { showDishWindowStatus, editDishWindowStatus, addDishWindowStatus, windowStatus, nowDishPage,windowsList, allDishPage } from "../status/data"
import { convertToChinaNum, showDishDateChinese } from "../api/etc"
import { lastPage,nextPage } from "../api/dish"

import DishShow from "../components/dish/DishShow.vue"
import DishEdit from "../components/dish/DishEdit.vue"
import DishAdd from "../components/dish/DishAdd.vue"
import Operations from "../components/Operations.vue"
import { initialdishManangeInformation } from "../api/dish"
import { dishInformation } from "../status/data"

const router = useRouter()
const userSearchInput = ref("")
const userFilterInput = ref([])

const search = async () => {
}

const userAddDish = () => {
    if (windowStatus.value) {
        return
    }
    addDishWindowStatus.value = true
}


nowDishPage.value = 1
initialdishManangeInformation()

function getIndex(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].canteen_id == val) return i;
    }
    return -1
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
    <el-header flex flex-row style="justify-content: space-between" item-center>
      <div>菜品管理</div>
      <div flex flex-row>
        <el-input v-model="userSearchInput"></el-input>
        <el-button @click="search" class="btn-above">搜索</el-button>
        <el-button class="btn-above">筛选</el-button>
        <el-button @click="router.push('/')" class="btn-above">返回</el-button>
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
            {{
              windowsList[
                getIndex(windowsList, scope.row.dish_id.slice(0, 2))
              ].campus.campus_name.slice(0, -2)
            }}-{{
              windowsList[getIndex(windowsList, scope.row.dish_id.slice(0, 2))]
                .canteen_name
            }}-{{ convertToChinaNum(scope.row.dish_id.slice(2, 4)) }}层-{{
              scope.row.dish_id.slice(4, 6) * 1
            }}号窗口-{{ scope.row.windows_name }}
          </template>
        </el-table-column>
        <el-table-column label="时间" grow="1">
          <template #default="scope">
            {{ showDishDateChinese(scope.row.date) }}
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
        <el-button>{{ nowDishPage }} / {{ allDishPage }}</el-button>
        <el-button @click="nextPage">下一页</el-button>
      </div>
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
      z-index: 100;
    "
    bg-yellow-5
    @click="userAddDish"
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

.btn-above{
    color: white;
    background-color: rgb(251, 189, 23);
}
</style>
