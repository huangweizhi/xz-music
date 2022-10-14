<script setup>
import { ref } from "vue"
import HotList from "./components/HotList.vue"
import { search } from "@/api"
import MusicList from "@/components/MusicList.vue"

// 搜索关键字
const searchWord = ref('')

// 热搜关键字搜索
const searchByWord = (word) => {
  searchWord.value = word
  // 搜索
  doSearch()
}

// 输入框搜索
const onSearch = () => {
  if(!searchWord.value) {
    searchMusicList.value = []
  }
  doSearch()
}

// 搜索
const searchMusicList = ref([])
const doSearch = async () => {
  const res = await search(searchWord.value)
  if(res.code !== 200) return
  searchMusicList.value = res.result.songs.map(item => {
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
  <!-- 搜索 -->
  <van-search
    v-model="searchWord"
    shape="round"
    placeholder="搜索歌曲"
    @search="onSearch"
  />

  <BetterScroll class="better-scroll">
    <!-- 热搜 -->
    <HotList v-if="searchMusicList.length < 1" @clickItem="searchByWord"></HotList>
    <!-- 搜索结果 -->
    <MusicList :data="searchMusicList"></MusicList>
  </BetterScroll>
</template>

<style lang="less" scoped>
.van-search {
  margin-top: 10px;
}
.better-scroll {
  height: calc(100% - 64px);
}
</style>