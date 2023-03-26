<script setup>
    import { ref, defineProps } from 'vue'

    import { windowsMessage, showWindowStatus, editWindowStatus, deleteWindowStatus, windowStatus } from '../status/data'

    const props = defineProps(['item'])

    console.log("operations was loaded, and it message is: ", props.item)

    const showItem = () => {
        if (windowStatus.value){
            return
        }
        windowsMessage.value = props.item
        showWindowStatus.value = true
        console.log("showItem was called, and it message is: ", windowsMessage.value)
    }

    const editItem = () => {
        if (windowStatus.value){
            return
        }
        windowsMessage.value = props.item
        editWindowStatus.value = true
        console.log("editItem was called, and it message is: ", windowsMessage.value)
    }

    const deleteItem = () => {
        if (windowStatus.value){
            return
        }

        windowsMessage.value = props.item
        deleteWindowStatus.value = true
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
  