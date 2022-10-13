<script setup>
import { ref, watch } from 'vue' 
import { useRouter, useRoute } from 'vue-router'
import PlayMusicBar from '@/components/PlayMusicBar.vue'
import TopBar from '@/components/TopBar.vue'

const route = useRoute()
const router = useRouter()

// 是否有标题栏
const hasHeader = ref(false)
if(route.meta.header) {
  hasHeader.value = true
}

// 选中的标签栏(1)
const activeIndex = ref(0)
const onChange = (index) => {
  if(index === 0) {
    router.push('/home')
  }
  if(index === 1) {
    router.push('/user')
  }
}

// 是否展示标签栏
const showTabbar = ref(true)
const tabbarPath = ['/home', '/user']
if(tabbarPath.indexOf(route.path) == -1) {
  showTabbar.value = false
}
// 选中的标签栏(2)
activeIndex.value = tabbarPath.indexOf(route.path)

// 监听路由改变
watch(
  () => route.path,
  newPath => {
    // 顶部标题栏
    hasHeader.value = route.meta.header
    // 底部标签栏
    activeIndex.value = tabbarPath.indexOf(newPath)
    if(activeIndex.value >= 0) {
      showTabbar.value = true
    }else {
      showTabbar.value = false
    }
  }
)

</script>

<template>
  <!-- 顶部标题栏 -->
  <TopBar :title="route.meta.name" v-if="hasHeader"></TopBar>

  <!-- 页面内容 -->
  <div :class="{'container': true, 'container-other': hasHeader}">
    <router-view v-slot="{ Component }">
      <keep-alive v-if="$route.meta.keepAlive">
        <component :is="Component" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view> 
  </div>

  <!-- 正在播放的音乐 PlayMusicBar -->
  <PlayMusicBar :class="{'play-music-bar': true, 'play-music-bar-other': hasHeader}"></PlayMusicBar>

  <!-- 底部标签栏 -->
  <van-tabbar v-model="activeIndex" @change="onChange" v-if="showTabbar"
    active-color="#57BEAD" inactive-color="#666">
    <van-tabbar-item icon="service-o">音乐</van-tabbar-item>
    <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style lang="less" scoped>
.container {
  width: 7.5rem;
  height: calc(100vh - 100px); // 减去Tabbar+PlayMusicBar
  overflow: hidden;
  padding: 0 0.2rem;
  box-sizing: border-box;
  background-color: @backgroundColor;
}
.container-other {
  height: calc(100vh - 100px); // 减去TopBar+Tabbar
}

.play-music-bar {
  position: fixed;
  bottom: 50px;
  margin: 0 0.25rem;
  transition: bottom 0.5s;
}
.play-music-bar-other {
  bottom: 0;
  transition: bottom 0.5s;
  background-color: #fff;
}
</style>
    