import { http } from "../utils/http"
import { allDishPage, dishInformation, nowDishPage,qty, } from "../status/data"


// page为当前页码，qty为每页数量

export const initialdishManangeInformation = async () => {
    const loading = ElLoading.service({
        fullscreen: true,
        text: "正在初始化",
    })

    await getDishInformationByPage(nowDishPage.value, qty.value)
        .then((i) => {
            loading.close()
            dishInformation.value = i
        })
        .catch((err) => {
            loading.close()
            ElMessageBox.confirm('获取菜品信息失败！', '初始化失败', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            console.error(err)
        }
        )
}

export const nextPage = async () => {
    if (nowDishPage.value === allDishPage.value) {
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
    await getDishInformationByPage(nowDishPage.value + 1, qty.value)
        .then((i) => {
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
                dishInformation.value = i
            }
        })
        .catch((err) => {
            loading.close()
        })
}

export const lastPage = async () => {
    if (nowDishPage.value === 1) {
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
    await getDishInformationByPage(nowDishPage.value - 1, qty.value)
        .then((i) => {
                loading.close()
                dishInformation.value = i
        })
        .catch((err) => {
            loading.close()
        })
}

export const deleteDish = async (item) => {
    const dish_id = item.dish_id
    ElMessageBox.confirm("是否确认删除该菜品信息？", "删除确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(async () => {
            const loading = ElLoading.service({
                fullscreen: true,
                text: "正在删除",
            })
            await pushDeleteDish(dish_id)
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
                    initialdishManangeInformation()
                })
        })
        .catch(() => {
            return
        })
}

export const getDishInformationByPage = async (page, qty) => {
    return await http.get(
        '/background/dishes',
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
                let o = i.data.data.dishes_information.map((j) => {
                    j['price']= j.prize
                    delete j.prize
                    j['picture'] = j.photo
                    delete j.photo
                    j['sparePicture'] = j.spare_photos
                    delete j.spare_photos
                    j['windows_name'] = j.position.window.window_name
                    j['windows_id'] = j.position.window.window_id
                    j['level'] = j.position.level.level
                    delete j.position
                    return j
                })
                console.log(i.data.data)
                nowDishPage.value = i.data.page_information.page
                allDishPage.value = i.data.page_information.total_page
                return o
            }
        })
        .catch((err) => {
            return err
        })
}

export const getWindows = async () => {
    return await http.get(
        '/background/windows',
    )
        .then((i) => {
            return i.data.data.canteens_information
        })
        .catch((err) => {
            return err
        }
        )
}

export const getDishInformationBySearch = async (sreachWord) => {
    console.log("搜索菜品：", sreachWord)
}

export const uploadPicture = async (a) => {
    let formData = new FormData()
    formData.append('photo', a.file)
    return await http.post('/background/photos', formData)
        .then(res => {
            return res.data.data.url
        }).catch((err) => {
            console.error(err);
        })
}

export const addDish = async (data) => {
    return await http.post('/background/dishes', data)
        .then((i) => {
            return i
        })
        .catch((err) => {
            return err
        })
}

export const pushDeleteDish = async (dish_id) => {
    return await http.delete('/background/dishes', {
        params: {
            dish_id: dish_id,
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
    return await http.put('/background/dishes', data)
        .then((i) => {
            return i
        })
        .catch((err) => {
            return err
        })
}