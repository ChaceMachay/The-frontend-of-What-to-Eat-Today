<script setup>
    import { ref, computed } from "vue"
    import { useRouter } from "vue-router"
    import { getCanteenInformationByPage } from "../api/canteen"

    import CanteenShow from "../components/CanteenShow.vue"
    //import CanteenEdit from "../components/CanteenEdit.vue"
    import Operations from "../components/Operations.vue"
    
    const router = useRouter()
    const nowPage = ref(1)
    const itemHeight = ref(20)
    const userSearchInput = ref("")
    const userFilterInput = ref([])
    const qty = computed(() =>{
        return document.body.clientHeight / 100 * 60 / itemHeight.value
    })
    const canteenInformation = ref([])

    canteenInformation.value = getCanteenInformationByPage(nowPage.value, qty.value)


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

    <CanteenShow />
    <!-- <CanteenEdit /> -->
    

    <!-- 这个表格还大有问题，要调整一下 -->

    <el-container>
        <el-header flex flex-col style="justify-content: space-between;">
            <div >餐厅管理</div>
            <div>
                <el-input v-model="userSearchInput"></el-input>
                <el-button>搜索</el-button>
                <el-button>筛选</el-button>
                <el-button @click="router.push('/')">返回</el-button>
            </div>
        </el-header>
        <el-main>
        <el-form>
            <el-form-item>
                <el-table :data="canteenInformation">
                    <el-table-column label="管理">
                        <template #default="scope">
                            <Operations :item="scope.row" />
                        </template>
                    </el-table-column>
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