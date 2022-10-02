<script setup>
import { ref, watch } from 'vue' 
import { useRouter, useRoute } from 'vue-router'
import PlayMusicBar from '@/components/PlayMusicBar.vue'

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

// 是否展示标签栏
const showTabbar = ref(true)

// 监听路由改变
watch(
  () => route.path,
  async newPath => {
    if(newPath === '/home') {
      active.value = 0
      showTabbar.value = true
    }
    else if(newPath === '/find') {
      active.value = 1
      showTabbar.value = true
    }
    else {
      showTabbar.value = false
    }
  }
)

</script>

<template>
  <!-- 页面内容 -->
  <div class="container">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view> 
  </div>

  <!-- 正在播放的音乐bar -->
  <PlayMusicBar :class="{'play-music-bar': showTabbar, 'play-music-bar-0': !showTabbar}"></PlayMusicBar>

  <!-- 底部标签栏 -->
  <van-tabbar v-model="active" @change="onChange" v-if="showTabbar"
    active-color="#57BEAD" inactive-color="#666">
    <van-tabbar-item icon="service-o">音乐</van-tabbar-item>
    <van-tabbar-item icon="apps-o">发现</van-tabbar-item>
  </van-tabbar>
</template>

<style lang="less" scoped>
.container {
  width: 7.5rem;
  height: calc(100vh - 50px);
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 0.1rem 0.2rem 50px 0.2rem;
  box-sizing: border-box;
  background-color: @backgroundColor;
}
.play-music-bar {
  position: absolute;
  bottom: 50px;
  margin: 0 0.25rem;
}
.play-music-bar-0 {
  position: absolute;
  bottom: 0;
  margin: 0 0.25rem;
}
</style>
    