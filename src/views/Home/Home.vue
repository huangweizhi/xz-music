<script setup>
import { useRouter } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'
import Banner from './components/Banner.vue'
import Category from './components/Category.vue'
import TopArtists from './components/TopArtists.vue'
import Personalized from './components/Personalized.vue'
import NewSong from './components/NewSong.vue'

const router = useRouter()
const clickInput = () => {
  router.push('/search')
}
</script>

<template>
  <!-- 搜索 -->
  <SearchBar @clickInput="clickInput">
    <template v-slot:left>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-lisimoshicaidandaohang"></use>
      </svg>
    </template>
  </SearchBar>

  <BetterScroll class="better-scroll">
    <!-- 轮播图 -->
    <Banner></Banner>
    <!-- 热门分类 -->
    <Category></Category>
    <!-- 热门歌手 -->
    <TopArtists></TopArtists>
    <!-- 推荐歌单 -->
    <Personalized></Personalized>
    <!-- 推荐新音乐 -->
    <NewSong></NewSong>
  </BetterScroll>
</template>

<style lang="less" scoped>
.better-scroll {
  height: calc(100% - 54px);
}
</style>
  