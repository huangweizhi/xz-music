<script setup>
import { useRouter } from 'vue-router'
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
  <div class="search-bar">
    <div class="bar-left">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-lisimoshicaidandaohang"></use>
      </svg>
    </div>
    <div class="bar-search">
      <van-search
        shape="round"
        placeholder="搜索"
        @clickInput="clickInput"
      />
    </div>
  </div>

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
.search-bar {
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  background-color: #fff;

  .bar-search {
    flex: 8;
  }
  .bar-left {
    flex: 1;
    color: @textColor;
    font-size: 0.45rem;
    text-align: center;
  }
}
.better-scroll {
  height: calc(100% - 54px);
}
</style>
  