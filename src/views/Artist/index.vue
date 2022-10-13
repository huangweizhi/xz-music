<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getArtists } from '@/api'
import MusicList from '@/components/MusicList.vue'

const route = useRoute()

onMounted(() => {
  getArtistsData()
})

// 歌手单曲
const artistMusicList = ref([])
// 歌手详情
const artistDetail = ref({})
const getArtistsData = async () => {
  const res = await getArtists(route.params.id)
  if(res.code !== 200) return
  artistDetail.value = res.artist
  artistMusicList.value = res.hotSongs.map(item => {
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
  <BetterScroll class="better-scroll">
    <div class="artist">
      <!-- 歌手简介 -->
      <div class="image">
        <img :src="artistDetail.picUrl + '?imageView&thumbnail=355y288' " />
        <div class="name">{{artistDetail.name}}</div>
      </div>
      <div class="desc">
        <div class="title">歌手简介</div>
        <div class="content">{{artistDetail.briefDesc}}</div>
      </div>
      <!-- 歌手热门歌曲 -->
      <MusicList :data="artistMusicList"></MusicList>
    </div>
  </BetterScroll>
</template>

<style lang="less" scoped>
.artist {
  width: 100%;

  .image {
    position: relative;
    width: 100%;
    height: 5.8rem;

    img {
      width: 100%;
    }
    .name {
      position: absolute;
      left: 0.3rem;
      bottom: 0.4rem;
      font-size: 0.4rem;
      font-weight: 500;
      color: #fff;
    }
  }

  .desc {
    .title {
      font-size: 0.3rem;
      line-height: 0.6rem;
      font-weight: bold;
      color: @textHightColor;
    }
    .content {
      line-height: 0.4rem;
    }
  } 
}
</style>
    