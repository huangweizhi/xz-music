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
  if (res.code !== 200) return
  // 数据处理
  newsongList.value = res.result.map(item => {
    return {
      id: item.id,
      name: item.name,
      picUrl: item.picUrl,
      artist: item.song.artists[0].name,
      mvid: item.song.mvid
    }
  })
}
</script>

<template>
  <Title name="推荐新音乐"></Title>
  <MusicList :data="newsongList" :showImg="true"></MusicList>
</template>

<style lang="less" scoped>

</style>
  