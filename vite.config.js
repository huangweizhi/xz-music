import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vant按需引入
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    // 路径别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      // less全局变量
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(__dirname, 'src/style.less')}";`,
        },
        javascriptEnabled: true
      }
    }
  }
})
