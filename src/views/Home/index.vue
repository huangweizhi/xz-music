<script setup>
import Banner from './Banner.vue'
import Category from './Category.vue'
import TopArtists from './TopArtists.vue'
import Personalized from './Personalized.vue'
import NewSong from './NewSong.vue'

</script>

<template>
  <!-- 轮播图 -->
  <Banner></Banner>
  <!-- 热门分类 -->
  <Category></Category>
   <!-- 热门歌手 -->
  <top-artists></top-artists>
  <!-- 推荐歌单 -->
  <personalized></personalized>
  <!-- 推荐新音乐 -->
  <new-song></new-song>
</template>

<style lang="less" scoped>

</style>
  