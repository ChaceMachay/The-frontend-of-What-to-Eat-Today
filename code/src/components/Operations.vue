<script setup>
import { defineProps } from 'vue'

import { windowsMessage, windowStatus } from '../status/data'
import { showCanteenWindowStatus, editCanteenWindowStatus } from '../status/data'
import { showDishWindowStatus, editDishWindowStatus } from '../status/data'

import { deleteCanteen } from '../api/canteen'
import { deleteDish } from '../api/dish'

const props = defineProps(['item', 'type'])


//  底下这一溜要根据type是canteen还是dish做个if-else

const showItem = () => {
    if (windowStatus.value) {
        return
    }
    if (props.type === "canteen") {
        showCanteenWindowStatus.value = true
        windowsMessage.value = props.item
    }
    else if (props.type === "dish") {
        showDishWindowStatus.value = true
        windowsMessage.value = props.item
    }
    else {
        console.error("undefined type props.")
        alert("系统版本过低，请更新系统后重试。")
    }
}

const editItem = () => {
    if (windowStatus.value) {
        return
    }
    if (props.type === "canteen") {
        editCanteenWindowStatus.value = true
        windowsMessage.value = props.item
    }
    else if (props.type === "dish") {
        editDishWindowStatus.value = true
        windowsMessage.value = props.item
    }
    else {
        console.error("undefined type props.")
        alert("系统版本过低，请更新系统后重试。")
    }
}

const deleteItem = () => {
    if (windowStatus.value) {
        return
    }
    if (props.type === "canteen") {
        deleteCanteen(props.item)
    }
    else if (props.type === "dish") {
        deleteDish(props.item)
    }
    else {
        console.error();("undefined type props.")
        alert("系统版本过低，请更新系统后重试。")
    }
}
</script>

<template>
    <div>
        <el-button size="small" @click="showItem" bg-yellow-5>
            <div>详情</div>
        </el-button>
        <el-button size="small" @click="editItem" bg-yellow-5>
            <div>修改</div>
        </el-button>
        <el-button size="small" @click="deleteItem" bg-yellow-5>
            <div>删除</div>
        </el-button>
    </div>
</template>
  