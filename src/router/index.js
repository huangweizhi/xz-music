import { createRouter, createWebHashHistory } from 'vue-router'

//路由表
const routes = [
  { path: '/', component: () => import('@/views/Home.vue') }
]

// 路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router