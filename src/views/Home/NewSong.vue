<script setup>
import { ref, onBeforeMount } from 'vue'
import Title from '@/components/Title.vue'
import SongList from '@/components/SongList.vue'


import { getPersonalizedNewsong } from '@/api'

onBeforeMount(() => {
  getPersonalizedNewsongData()
})

/**
 * 获取推荐新音乐
 */
const newsongList = ref()
const getPersonalizedNewsongData = async () => {
  const res = await getPersonalizedNewsong()
  newsongList.value = res.result
}
</script>

<template>
  <Title name="推荐新音乐"></Title>
  <song-list :data="newsongList"></song-list>
</template>

<style lang="less" scoped>

</style>
  