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
      artist: item.ar[0].name,
      mvid: item.mv
    }
  })
}

</script>

<template>
  <div class="play-list-detail">
    <!-- 歌单简介 -->
    <div class="header">
      <van-image
        width="2.6rem"
        height="2.6rem"
        radius="0.3rem"
        :src="playListDetail.coverImgUrl + '?imageView&thumbnail=100y100'"
      />
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

    .right {
      width: 4.5rem;
      padding-left: 0.2rem;
      overflow: hidden;

      .title {
        font-size: 0.3rem;
        color: @textHightColor;
        line-height: 0.6rem;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-break: break-all;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .desc {
        line-height: 0.4rem;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-break: break-all;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
      }
    }
  }
}

.better-scroll {
  height: calc(100% - 3.2rem);
}
</style>
    