<script setup>
  import { ref, watch } from 'vue' 
  import { useRouter, useRoute } from 'vue-router'
  
  const route = useRoute()
  const router = useRouter()
  
  // 选中的标签栏
  const active = ref(0)
  const onChange = (index) => {
    if(index === 0) {
      router.push('/home')
    }
    if(index === 1) {
      router.push('/find')
    }
  }
  
  // 监听路由改变
  watch(
    () => route.path,
    async newPath => {
      if(newPath === '/home') {
        active.value = 0
      }
      if(newPath === '/find') {
        active.value = 1
      }
    }
  )
  
  </script>
  
  <template>
    <div class="container">
      <!-- 页面 -->
      <router-view></router-view>
    </div>
    <!-- 底部标签栏 -->
    <van-tabbar v-model="active" @change="onChange" active-color="#57BEAD" inactive-color="#666">
      <van-tabbar-item icon="service-o">音乐</van-tabbar-item>
      <van-tabbar-item icon="apps-o">发现</van-tabbar-item>
    </van-tabbar>
  </template>
  
  <style lang="less" scoped>
  .container {
    width: 7.5rem;
    height: calc(100vh - 50px);
    padding: 0.1rem 0.1rem 0 0.1rem;
    box-sizing: border-box;
    background-color: @backgroundColor;
  }
  </style>
      