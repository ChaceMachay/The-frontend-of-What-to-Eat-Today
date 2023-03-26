import { ref,computed } from "vue"

export const canteenLevelLimit = 10
export const canteenWindowsLimit = 20


export const showWindowStatus = ref(false)
export const editWindowStatus = ref(false)
export const windowStatus = computed(() => {
    return showWindowStatus.value || editWindowStatus.value
})
export const windowsMessage = ref(null)


