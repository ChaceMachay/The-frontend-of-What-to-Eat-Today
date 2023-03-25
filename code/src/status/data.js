import { ref,computed } from "vue"


export const showWindowStatus = ref(false)
export const editWindowStatus = ref(false)
export const deleteWindowStatus = ref(false)
export const windowStatus = computed(() => {
    return showWindowStatus.value || editWindowStatus.value || deleteWindowStatus.value
})
export const windowsMessage = ref(null)