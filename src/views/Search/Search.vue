<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import HotList from "./components/HotList.vue"
import MusicList from "@/components/MusicList.vue"
import SearchBar from "@/components/SearchBar.vue"
import { search } from "@/api"

// 返回
const router = useRouter()
const goBack = () => {
  router.go(-1)
}

// 搜索类型
const activeName = ref('1')

// 输入框搜索
const onSearch = (word) => {
  if(!word) {
    searchMusicList.value = []
  }
  doSearch(word)
}

// 搜索
const searchMusicList = ref([])
const doSearch = async (word) => {
  const res = await search(word)
  if(res.code !== 200) return
  searchMusicList.value = res.result.songs.map(item => {
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

</script>

<template>
  <!-- 搜索 -->
  <SearchBar @onSearch="onSearch">
    <template v-slot:left>
      <svg class="icon" aria-hidden="true" @click="goBack">
        <use xlink:href="#icon-houtuishangyige"></use>
      </svg>
    </template>
  </SearchBar>

  <van-tabs v-model:active="activeName">
    <van-tab title="单曲" name="1">
      
    </van-tab>

    <van-tab title="歌词" name="1006">
      
    </van-tab>
    <van-tab title="歌单" name="1000">

    </van-tab>
    <van-tab title="歌手" name="100">

    </van-tab>
    <van-tab title="MV" name="1004">

    </van-tab>
  </van-tabs>

  <BetterScroll class="better-scroll">
    <!-- 热搜 -->
    <HotList v-if="searchMusicList.length < 1" @clickItem="doSearch"></HotList>
    <!-- 搜索结果 -->
    <MusicList :data="searchMusicList"></MusicList>
  </BetterScroll>
</template>

<style lang="less" scoped>
.better-scroll {
  height: calc(100% - 54px);
}
</style>