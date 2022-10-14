<script setup>
import Banner from './components/Banner.vue'
import Category from './components/Category.vue'
import TopArtists from './components/TopArtists.vue'
import Personalized from './components/Personalized.vue'
import NewSong from './components/NewSong.vue'
</script>

<template>
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

</style>
  