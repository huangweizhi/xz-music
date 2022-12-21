<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { getRecommendSongs } from '@/api'
import MusicList from '@/components/MusicList.vue'
import { Toast } from 'vant'

const router = useRouter()

onMounted(() => {
  getRecommendSongsData()
})

// 获取每日推荐歌单
const musiclist = ref([])
const getRecommendSongsData = async () => {
  const res = await getRecommendSongs()
  if(res.code == 302) {
    Toast('请登陆')
    setTimeout(() => {
      router.push('/user')
    }, 1000)
    return
  }
  if(res.code !== 200) return
  // 数据处理
  musiclist.value = res.data.dailySongs.map(item => {
    return {
      id: item.id,
      name: item.name,
      picUrl: item.al.picUrl,
      artist: item.ar[0].name,
      mvid: item.mv,
      sq: item.sq,
      fee: item.fee
    }
  })
}

// 下拉刷新
const betterScroll = ref(null)
const pullingDown = async () => {
  await getRecommendSongsData()
  betterScroll.value.refresh()
  betterScroll.value.finishPullDown()
}

</script>

<template>
  <!-- 歌单音乐 -->
  <BetterScroll class="better-scroll" :usePullDown="true" @pullingDown="pullingDown" ref="betterScroll">
    <MusicList :data="musiclist" :showImg="true"></MusicList>
  </BetterScroll>
</template>

<style lang="less" scoped>

</style>
    