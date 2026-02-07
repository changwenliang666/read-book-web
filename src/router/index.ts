import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 定义路由规则
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/pages/HomeIndex.vue')
    },
    {
        path: '/:pathMatch(.*)',
        name: 'NotFoundPage',
        component: () => import("@/pages/NotFoundPage.vue")
    }
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(), // history 模式
    routes,
})

export default router
