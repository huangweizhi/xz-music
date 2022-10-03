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
        meta: {
          header: false // 是否有标题栏
        }
      },
      { 
        path: '/find', 
        component: () => import('@/views/Find/index.vue'), 
        meta: {
          header: false
        }
      },
      { 
        path: '/category', 
        component: () => import('@/views/Category/index.vue'),
        meta: {
          header: true,
          name: '分类'
        }
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