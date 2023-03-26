export const deleteCanteen = (item) => {
    const dish_id = item.dish_id
    ElMessageBox.confirm("是否确认删除该菜品信息？", "删除确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            //pushDeleteDish(dish_id)
            console.log("删除菜品：",dish_id)
            ElMessageBox.confirm("删除成功！", "删除成功", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
        })
        .catch(() => {
            return
        })
}