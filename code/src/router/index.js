import { createRouter, createWebHashHistory } from 'vue-router'

import choosechildsystem from "../pagelittles/choosechildsystem.vue"
import canteenmanage from "../pagelittles/canteenmanage.vue"
import dishmanage from "../pagelittles/dishmanage.vue"


const routes = [
    {
        path: "/",
        component: choosechildsystem,
    },
    {
        path: "/canteenManage",
        component: canteenmanage,
    },
    {
        path: "/dishManage",
        component: dishmanage,
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