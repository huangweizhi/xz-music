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
          header: false, // 是否有标题栏
          name: '音乐'
        }
      },
      { 
        path: '/find', 
        component: () => import('@/views/Find/index.vue'), 
        meta: {
          header: false,
          name: '发现'
        }
      },
      { 
        path: '/category', 
        component: () => import('@/views/Category/index.vue'),
        meta: {
          header: true,
          name: '分类'
        }
      },
      { 
        path: '/category/:type', 
        component: () => import('@/views/PlayList/index.vue'),
        meta: {
          header: true,
          name: '歌单'
        }
      },
      { 
        path: '/playlist/:id', 
        component: () => import('@/views/PlayListDetail/index.vue'),
        meta: {
          header: true,
          name: '歌单详情'
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