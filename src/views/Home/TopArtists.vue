<script setup>
import { ref, onBeforeMount } from 'vue'
import Title from '@/components/Title.vue'
import ScrollItem from '@/components/ScrollItem.vue'

import { getTopArtists } from '@/api'

onBeforeMount(() => {
  getTopArtistsData()
})

/**
 * 获取热门歌手
 */
const artists = ref()
const getTopArtistsData = async () => {
  const res = await getTopArtists()
  artists.value = res.artists
}
</script>

<template>
  <Title name="热门歌手"></Title>
  <scroll-item :data="artists"></scroll-item>
</template>

<style lang="less" scoped>

</style>
  