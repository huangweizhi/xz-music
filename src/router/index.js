import { createRouter, createWebHashHistory } from 'vue-router'

//路由表
const routes = [
  { 
    path: '/', 
    name: 'Layout',
    component: () => import('@/views/Layout.vue'), 
    redirect: '/home',
    children: [
      {
        path: '/home', 
        name: 'Home', // 用于缓存页面
        component: () => import('@/views/Home/Home.vue'), 
        meta: {
          header: false, // 是否有标题栏
          name: '音乐', // 页面名称
          keepAlive: true, // 是否缓存
        }
      },
      { 
        path: '/user', 
        name: 'User',
        component: () => import('@/views/User/User.vue'),
        meta: {
          header: false,
          name: '我的',
          keepAlive: true
        }
      },

      { 
        path: '/category', 
        name: 'Category',
        component: () => import('@/views/Category.vue'),
        meta: {
          header: true,
          name: '分类',
          keepAlive: true
        }
      },
      { 
        path: '/category/:type', 
        name: 'PlayList',
        component: () => import('@/views/PlayList.vue'),
        meta: {
          header: true,
          name: '歌单',
          keepAlive: false
        }
      },
      { 
        path: '/playlist/:id', 
        name: 'PlayListDetail',
        component: () => import('@/views/PlayListDetail.vue'),
        meta: {
          header: true,
          name: '歌单详情',
          keepAlive: false
        }
      },
      { 
        path: '/recommend/songs', 
        name: 'RecommendSongs',
        component: () => import('@/views/RecommendSongs.vue'),
        meta: {
          header: true,
          name: '每日推荐',
          keepAlive: false
        }
      },
      { 
        path: '/search', 
        name: 'Search',
        component: () => import('@/views/Search/Search.vue'),
        meta: {
          header: true,
          name: '搜索',
          keepAlive: true
        }
      },
      { 
        path: '/artist/:id/detail', 
        name: 'Artist',
        component: () => import('@/views/Artist.vue'),
        meta: {
          header: true,
          name: '歌手',
          keepAlive: false
        }
      },
      { 
        path: '/toplist', 
        name: 'TopList',
        component: () => import('@/views/TopList.vue'),
        meta: {
          header: true,
          name: '排行榜',
          keepAlive: true
        }
      },
      { 
        path: '/mv', 
        name: 'MVList',
        component: () => import('@/views/MVList.vue'),
        meta: {
          header: true,
          name: 'MV',
          keepAlive: true
        }
      },
      { 
        path: '/mv/:id', 
        name: 'PlayMV',
        component: () => import('@/views/PlayMV.vue'),
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