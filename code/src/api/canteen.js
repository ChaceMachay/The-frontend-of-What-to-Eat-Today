import { ref } from "vue"

import { http } from "../utils/http"

import { allCanteenPage, canteenInformation, nowCanteenPage, qty } from "../status/data"

import { copy } from "./etc"


// page为当前页码，qty为每页数量

export const initialCanteenManangeInformation = async () => {
    const loading = ElLoading.service({
        fullscreen: true,
        text: "正在初始化",
    })
    await getCanteenInformationByPage(nowCanteenPage.value, qty.value)
        .then((i) => {
            loading.close()
            canteenInformation.value = i
        })
        .catch(async (err) => {
            loading.close()
            await ElMessageBox.confirm('获取餐厅信息失败！', '初始化失败', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            console.error(err)
        }
        )
}

export const nextPage = async () => {
    if (nowCanteenPage.value === allCanteenPage.value) {
        await ElMessageBox.confirm('已经是最后一页了', '加载失败', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        return
    }
    const loading = ElLoading.service({
        fullscreen: true,
        text: "正在加载",
    })
    await getCanteenInformationByPage(nowCanteenPage.value + 1, qty.value)
        .then(async (i) => {
            if (i.length === 0) {
                loading.close()
                ElMessageBox.confirm('已经是最后一页了', '加载失败', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                return
            }
            else {
                loading.close()
                canteenInformation.value = i
            }
        })
        .catch((err) => {
            loading.close()
        })
}

export const lastPage = async () => {
    if (nowCanteenPage.value === 1) {
        await ElMessageBox.confirm('已经是第一页了', '加载失败', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
        return
    }
    const loading = ElLoading.service({
        fullscreen: true,
        text: "正在加载",
    })
    await getCanteenInformationByPage(nowCanteenPage.value - 1, qty.value)
        .then((i) => {
                loading.close()
                canteenInformation.value = i
        })
        .catch((err) => {
            loading.close()
        })
}

export const deleteCanteen = async (item) => {
    const canteen_id = item.canteen_id
    ElMessageBox.confirm("是否确认删除该餐厅信息？", "删除确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(async () => {
            const loading = ElLoading.service({
                fullscreen: true,
                text: "正在删除",
            })
            await pushDeleteCanteen(canteen_id)
                .then(async (i) => {
                    loading.close()
                    await ElMessageBox.confirm("删除成功！", "删除成功", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                    .catch(i =>{
                        console.log(i)
                    })
                })
                .catch(async (err) => {
                    loading.close()
                    await ElMessageBox.confirm("删除失败！", "删除失败", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                    .catch(i =>{
                        console.log(i)
                    })
                    console.error(err)
                })
                .finally(() => {
                    initialCanteenManangeInformation()
                })
        })
        .catch(() => {
            return
        })
}


export const getCanteenInformationByPage = async (page, qty) => {
    return await http.get(
        '/background/canteens',
        {
            params:
            {
                page: page,
                limit: qty,
            },
        },
    )
        .then((i) => {
            if ('response' in i) {
                return []
            }
            else {
                let o = i.data.data.canteens_information.map((j) => {
                    j['information'] = copy(j['levels_information'])
                    delete j['levels_information']
                    j['information'].map((k) => {
                        k['information'] = copy(k['windows_information'])
                        delete k['windows_information']
                    })
                    return j
                })
                nowCanteenPage.value = i.data.data.page_information.page
                allCanteenPage.value = i.data.data.page_information.total_page
                return o
            }
        })
        .catch((err) => {
            return err
        })
}
export const getCampus = async () => {
    return await http.get(
        '/background/campus'
    )
        .then((i) => {
            return i.data.data.campus
        })
        .catch((err) => {
            return err
        }
        )
}

export const getCanteenInformationBySearch = (sreachWord) => {
    console.log("搜索餐厅：", sreachWord)
}

export const addCanteen = async (data) => {
    return await http.post('/background/canteens', data)
        .then((i) => {
            return i
        })
        .catch((err) => {
            return err
        })
}

export const pushDeleteCanteen = async (canteen_id) => {
    return await http.delete('/background/canteens', {
        params: {
            canteen_id: canteen_id,
        },
    })
        .then((i) => {
            return i
        })
        .catch((err) => {
            return err
        })
}

export const pushEditData = async (data) => {
    return await http.put('/background/canteens', data)
        .then((i) => {
            return i
        })
        .catch((err) => {
            return err
        })
}