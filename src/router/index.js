import { createRouter, createWebHashHistory } from 'vue-router'

//路由表
const routes = [
  { 
    path: '/', 
    component: () => import('@/views/Layout.vue'), 
    redirect: '/home',
    children: [
      {
        path: '/home', 
        component: () => import('@/views/Home/index.vue'), 
      },
      { 
        path: '/find', 
        component: () => import('@/views/Find/index.vue') 
      },
      {
        path: '/play/music', 
        name: 'playMusic',
        component: () => import('@/views/PlayMusic/index.vue')
      }
    ]
  }
]

// 路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router