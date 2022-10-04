<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPlayListDetail } from '@/api'
import MusicList from '@/components/MusicList.vue'

const route = useRoute()

onMounted(() => {
  getPlayListDetailData(route.params.id)
})

// 获取歌单详情
const playListDetail = ref([])
const musiclist = ref([])
const getPlayListDetailData = async (id) => {
  const res = await getPlayListDetail(id)
  if(res.code !== 200) return 
  
  const {playlist} = res
  playListDetail.value = playlist
  musiclist.value = playlist.tracks.map(item => {
    return {
      id: item.id,
      name: item.name,
      picUrl: item.al.picUrl,
      artist: item.ar[0].name
    }
  })
}

</script>

<template>
  <div class="play-list-detail">
    <!-- 歌单简介 -->
    <div class="header">
      <img :src="playListDetail.coverImgUrl" alt="" />
      <div class="right">
        <div class="title">{{playListDetail.name}}</div>
        <div class="desc">{{playListDetail.description}}</div>
      </div>
    </div>
    <!-- 歌单音乐 -->
    <MusicList :data="musiclist"></MusicList>
  </div>
</template>

<style lang="less" scoped>
.play-list-detail {

  .header {
    display: flex;
    max-height: 2.6rem;
    padding: .3rem 0;
    
    img {
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 0.3rem;
    } 

    .right {
      width: 4.5rem;
      padding-left: 0.2rem;
      overflow: hidden;

      .title {
        font-size: 0.3rem;
      }
      .desc {
        margin-top: 0.2rem;
      }
    }
  }
}
</style>
    