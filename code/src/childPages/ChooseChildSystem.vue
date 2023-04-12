<script setup>  
import { ref } from "vue"
import { useRouter } from "vue-router"
import { qty } from "../status/data";
import { initialShareInformation } from "../api/etc";

const router = useRouter()


//  item 是显示的名称; icon 是图标的绝对或者相对路径，推荐绝对路径; path 即该子系统的路由访问路径
const childSystemItemList = ref(
    [
        {
            "item": "餐厅管理",
            "icon": "/pics/canteen.jpg",
            "path": "/canteenManage",
        },
        {
            "item": "菜品管理",
            "icon": "/pics/dish.jpg",
            "path": "/dishManage",
        },
    ]
)

initialShareInformation()
qty.value = parseInt((document.body.clientHeight - 400) / 40)

</script>

<template>
    <div flex flex-row>
        <div v-for="item in childSystemItemList" style="background: rgb(251,189,23)" wa ha 
                flex flex-row items-center m-8 pa-8 rd-6
                @click="router.push(item.path)">

            <el-avatar size="large" :src="item.icon" />
            <span c-white ml-4> {{ item.item }} </span>
        </div>
    </div>
</template>