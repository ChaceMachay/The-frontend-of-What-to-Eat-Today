<script setup>
import { ref } from "vue"

import login from "./pages/login.vue"
import work from "./pages/work.vue"

const mainPageStructList = [login, work]
const mainPageStructStatus = ref(1)
</script>

<template>
<div>
    <component :is="mainPageStructList[mainPageStructStatus]" /> 
</div>
</template>