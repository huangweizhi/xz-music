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
      <img :src="playListDetail.coverImgUrl + '?imageView&thumbnail=100y100'" alt="" />
      <div class="right">
        <div class="title">{{playListDetail.name}}</div>
        <div class="desc">{{playListDetail.description}}</div>
      </div>
    </div>

    <BetterScroll class="better-scroll">
      <!-- 歌单音乐 -->
      <MusicList :data="musiclist"></MusicList>
    </BetterScroll>
  </div>
</template>

<style lang="less" scoped>
.play-list-detail {
  width: 100%;
  height: 100%;

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
        color: @textHightColor;
        line-height: 0.6rem;
      }
      .desc {
        line-height: 0.4rem;
      }
    }
  }
}

.better-scroll {
  height: calc(100% - 3.2rem);
}
</style>
    