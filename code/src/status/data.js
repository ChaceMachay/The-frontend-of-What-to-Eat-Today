import { ref,computed } from "vue"

export const canteenLevelLimit = 10
export const canteenWindowsLimit = 20

export const canteenWindowStatus = ref(false)
export const dishWindowStatus = ref(false)

export const showWindowStatus = ref(false)
export const editWindowStatus = ref(false)
export const addWindowStatus = ref(false)
export const windowStatus = computed(() => {
    return showWindowStatus.value || editWindowStatus.value || addWindowStatus.value
})
export const windowsMessage = ref(null)


