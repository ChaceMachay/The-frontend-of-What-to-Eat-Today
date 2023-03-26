<script setup>
    import { ref, defineProps } from 'vue'

    import { windowsMessage, showWindowStatus, editWindowStatus,windowStatus } from '../status/data'

    import { deleteCanteen } from './CanteenDelete'
    //import { deleteDish } from './DishDelete'



    const props = defineProps(['item','type'])

    console.log("operations was loaded, and it message is: ", props.item)


    //  底下这一溜要根据type是canteen还是dish做个if-else

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
        console.log("deleteItem was called, and it message is: ", props.type)
        if (windowStatus.value){
            return
        }
        if (props.type === "canteen"){
            deleteCanteen(props.item)
        }
        //else if(props.type === "dish"){
            //deleteDish(props.item)
        //}
        else {
            console.log("undefined type props.")
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
  