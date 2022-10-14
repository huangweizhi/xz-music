<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import Title from '@/components/Title.vue'
import ScrollItem from '@/components/ScrollItem.vue'

import { getTopArtists } from '@/api'

const router = useRouter()
onBeforeMount(() => {
  getTopArtistsData()
})

// 点击查看歌手
const clickItem = (id) => {
  router.push(`/artist/${id}/detail`)
}

/**
 * 获取热门歌手
 */
const artists = ref([])
const getTopArtistsData = async () => {
  const res = await getTopArtists()
  artists.value = res.artists
}
</script>

<template>
  <Title name="热门歌手"></Title>
  <scroll-item class="scroll-item" :data="artists" @clickItem="clickItem"></scroll-item>
</template>

<style lang="less" scoped>
.scroll-item {
  width: 100%;
  min-height: 2.7rem;
}
</style>
  