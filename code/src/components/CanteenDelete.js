export const deleteCanteen = (item) => {
    const canteen_id = item.canteen_id
    ElMessageBox.confirm("是否确认删除该餐厅信息？", "删除确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            //pushDeleteCanteen(canteen_id)
            console.log("删除餐厅：",canteen_id)
        })
        .catch(() => {
            return
        })
}