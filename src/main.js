import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'

// 屏幕适配
import './assets/js/rem'
// 全局样式
import './style.less'
// vant函数组件样式
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'
// 阿里图标
import './assets/js/iconfont'

import App from './App.vue'

import {consolePrint} from './utils'
consolePrint()

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
