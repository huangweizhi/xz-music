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
          name: '音乐', // 页面名称
          keepAlive: true, // 是否缓存
        }
      },
      { 
        path: '/user', 
        component: () => import('@/views/User/index.vue'),
        meta: {
          header: false,
          name: '我的',
          keepAlive: true
        }
      },

      { 
        path: '/category', 
        component: () => import('@/views/Category/index.vue'),
        meta: {
          header: true,
          name: '分类',
          keepAlive: true
        }
      },
      { 
        path: '/category/:type', 
        component: () => import('@/views/PlayList/index.vue'),
        meta: {
          header: true,
          name: '歌单',
          keepAlive: false
        }
      },
      { 
        path: '/playlist/:id', 
        component: () => import('@/views/PlayListDetail/index.vue'),
        meta: {
          header: true,
          name: '歌单详情',
          keepAlive: false
        }
      },
      { 
        path: '/recommend/songs', 
        component: () => import('@/views/RecommendSongs/index.vue'),
        meta: {
          header: true,
          name: '每日推荐',
          keepAlive: true
        }
      },
      { 
        path: '/search', 
        component: () => import('@/views/Search/index.vue'),
        meta: {
          header: true,
          name: '搜索',
          keepAlive: true
        }
      },
      { 
        path: '/artist/:id/detail', 
        component: () => import('@/views/Artist/index.vue'),
        meta: {
          header: true,
          name: '歌手',
          keepAlive: false
        }
      },
      { 
        path: '/toplist', 
        component: () => import('@/views/TopList/index.vue'),
        meta: {
          header: true,
          name: '排行榜',
          keepAlive: true
        }
      },
      { 
        path: '/mv', 
        component: () => import('@/views/MVList/index.vue'),
        meta: {
          header: true,
          name: 'MV',
          keepAlive: true
        }
      },
      { 
        path: '/mv/:id', 
        component: () => import('@/views/PlayMV/index.vue'),
        name: 'mvId',
        meta: {
          header: true,
          name: 'MV详情',
          keepAlive: false
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