<script setup>
import { ref, onBeforeMount } from 'vue'
import Title from '@/components/Title.vue'
import MusicList from '@/components/MusicList.vue'


import { getPersonalizedNewsong } from '@/api'

onBeforeMount(() => {
  getPersonalizedNewsongData()
})

/**
 * 获取推荐新音乐
 */
const newsongList = ref([])
const getPersonalizedNewsongData = async () => {
  const res = await getPersonalizedNewsong()
  newsongList.value = res.result
}
</script>

<template>
  <Title name="推荐新音乐"></Title>
  <MusicList :data="newsongList"></MusicList>
</template>

<style lang="less" scoped>

</style>
  