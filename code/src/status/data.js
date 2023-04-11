import { ref,computed } from "vue"

export const canteenLevelLimit = 10
export const canteenWindowsLimit = 20

export const showCanteenWindowStatus = ref(false)
export const editCanteenWindowStatus = ref(false)
export const addCanteenWindowStatus = ref(false)
export const showDishWindowStatus = ref(false)
export const editDishWindowStatus = ref(false)
export const addDishWindowStatus = ref(false)

export const windowStatus = computed(() => {
    return showCanteenWindowStatus.value || editCanteenWindowStatus.value || addCanteenWindowStatus.value
            ||showDishWindowStatus.value || editDishWindowStatus.value || addDishWindowStatus.value
})
export const windowsMessage = ref({})

export const baseUrl = 'https://0nlinetek-eat.azurewebsites.net'


