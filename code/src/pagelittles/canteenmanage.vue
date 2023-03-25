<script setup>
    import { now } from "lodash";
import { ref } from "vue"
    import { getCanteenInformationByPage } from "../api/canteen"
    
    const nowPage = ref(1)
    const itemHeight = ref(20)
    const qty = computed(() =>{
        return document.body.clientHeight / 100 * 60 / itemHeight.value
    })
    const canteenInformation = ref([])

    canteenInformation.value = await getCanteenInformationByPage(nowPage.value, qty.value)


    const nextPage = async () => {
        try{
            canteenInformation.value = await getCanteenInformationByPage(nowPage.value + 1, qty.value)
        }
        catch{
            alert("已经是最后一页了")
            return
        }
        nowPage.value += 1
    }

    const lastPage = async () => {
        try{
            canteenInformation.value = await getCanteenInformationByPage(nowPage.value - 1, qty.value)
        }
        catch{
            alert("已经是第一页了")
            return
        }
        nowPage.value -= 1
    }

</script>

<template>
    

    <!-- 这个表格还大有问题，要调整一下 -->

    <el-container>
        <el-main>
        <el-form>
            <el-form-item>
                <el-table :data="canteenInformation">
                    <el-table-column prop="canteenName" label="食堂名称"></el-table-column>
                    <el-table-column prop="canteenAddress" label="食堂地址"></el-table-column>
                    <el-table-column prop="canteenPhone" label="食堂电话"></el-table-column>
                    <el-table-column prop="canteenDescription" label="食堂描述"></el-table-column>
                </el-table>
            </el-form-item>
        </el-form>
        </el-main>
        <el-footer>
            <el-button @click="lastPage">上一页</el-button>
            <el-button @click="nextPage">下一页</el-button>
        </el-footer>
    </el-container>
</template>