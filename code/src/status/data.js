import { ref, computed } from "vue"

export const options = ref([{ 'campus_id': 1, 'campus_name': '齐园' }])
export const windowsList = ref([])
export const reloadStatus = ref(false)

export const canteenInformation = ref([])
export const dishInformation = ref([])
export const nowCanteenPage = ref(1)
export const nowDishPage = ref(1)
export const allCanteenPage = ref(1)
export const allDishPage = ref(1)
export const qty = ref(15)

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
        || showDishWindowStatus.value || editDishWindowStatus.value || addDishWindowStatus.value
})
export const windowsMessage = ref({})

export const baseUrl = 'https://0nlinetek-eat.azurewebsites.net'

export const checkPriceByBlur = /^((([1-9]([0-9]{0,300}))|(0))(\.[0-9]{1,2})?)$|^(0{1})$/g
export const checkPriceByInput = /^((([1-9]([0-9]{0,300}))|(0))(\.[0-9]{0,2})?)$|^(0{0,1})$/g



