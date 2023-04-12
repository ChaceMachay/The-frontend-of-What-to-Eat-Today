import { createRouter, createWebHashHistory } from 'vue-router'

import ChooseChildSystem from "../childPages/ChooseChildSystem.vue"
import CanteenManage from "../childPages/CanteenManage.vue"
import DishManage from "../childPages/DishManage.vue"


const routes = [
    {
        path: "/",
        component: ChooseChildSystem,
    },
    {
        path: "/canteenManage",
        component: CanteenManage,
    },
    {
        path: "/dishManage",
        component: DishManage,
    },
    {
        path: '/:pathMatch(.*)*',
        component: {
            template: `页面不存在`,
        },
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

export default router