<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

import { getRecommendSongs } from '@/api'
import MusicList from '@/components/MusicList.vue'
import { getCookie } from '@/utils/auth'
import { Toast } from 'vant'

const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  getRecommendSongsData()
})

// 获取每日推荐歌单
const musiclist = ref([])
const getRecommendSongsData = async () => {
  getRecommendSongs(getCookie())
    .then(res => {
      if(res.code !== 200) {
        Toast('请登陆')
        userStore.deleteCookie()
        userStore.deleteUser()
        router.push('/user')
      }
      // 数据处理
      musiclist.value = res.data.dailySongs.map(item => {
        return {
          id: item.id,
          name: item.name,
          picUrl: item.al.picUrl,
          artist: item.ar[0].name
        }
      })
    })
    .catch(err => {
      Toast('请登陆')
      userStore.deleteCookie()
      userStore.deleteUser()
      router.push('/user')
    })
  
}

</script>

<template>
  <!-- 歌单音乐 -->
  <MusicList :data="musiclist"></MusicList>
</template>

<style lang="less" scoped>

</style>
    