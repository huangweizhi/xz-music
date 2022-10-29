<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import HotList from "./components/HotList.vue"
import MusicList from "@/components/MusicList.vue"
import { search } from "@/api"

// 返回
const router = useRouter()
const goBack = () => {
  router.go(-1)
}

// 热搜
const hotSearch = (word) => {
  searchWord.value = word
  doSearch()
}

// 输入框搜索
const searchWord = ref('')
const onSearch = () => {
  if(!searchWord.value) {
    searchMusicList.value = []
  }
  doSearch()
}

// 搜索类型
const activeName = ref('1')
// 搜索类型变化
const activeChange = () => {
  doSearch()
}

// 搜索
const searchMusicList = ref([])
const doSearch = async () => {
  // 搜索类型
  let type = activeName.value
  const res = await search(searchWord.value, type)
  if(res.code !== 200) return
  // 单曲
  if(type == '1') {
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
  // 歌单
  if(type == '1000') {
    console.log(res)
  }
  // 歌手
  if(type == '100') {
    console.log(res)
  }
  // 歌词
  if(type == '1006') {
    console.log(res)
  }
  // MV
  if(type == '1004') {
    console.log(res)
  }
}

</script>

<template>
  <div class="search">
    <!-- 搜索 -->
    <div class="search-bar">
      <div class="bar-left">
        <svg class="icon" aria-hidden="true" @click="goBack">
          <use xlink:href="#icon-houtuishangyige"></use>
        </svg>
      </div>
      <div class="bar-search">
        <van-search
          v-model="searchWord"
          shape="round"
          placeholder="搜索"
          @search="onSearch"
        />
      </div>
    </div>

    <!-- 热搜 -->
    <BetterScroll class="better-scroll" v-if="searchMusicList.length < 1">
      <HotList @clickItem="hotSearch"></HotList>
    </BetterScroll>

    <div class="search-content" v-else>
      <van-tabs v-model:active="activeName" @change="activeChange">
        <van-tab title="单曲" name="1"></van-tab>
        <van-tab title="歌单" name="1000"></van-tab>
        <van-tab title="歌手" name="100"></van-tab>
        <van-tab title="歌词" name="1006"></van-tab>
        <van-tab title="MV" name="1004"></van-tab>
      </van-tabs>
      <BetterScroll class="better-scroll">
        <!-- 搜索结果 -->
        <MusicList v-show="activeName==1" :data="searchMusicList"></MusicList>
        <div v-show="activeName==1000"></div>
        <div v-show="activeName==100"></div>
        <div v-show="activeName==1006"></div>
        <div v-show="activeName==1004"></div>
      </BetterScroll>
    </div>
  </div>
  
</template>

<style lang="less" scoped>
.search {
  width: 100%;
  height: 100%;

  .search-bar {
    width: 100%;
    height: 54px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    background-color: #fff;

    .bar-search {
      flex: 8;
    }
    .bar-left {
      flex: 1;
      color: @textColor;
      font-size: 0.45rem;
      text-align: center;
    }
  }

  .better-scroll {
    height: calc(100% - 54px);
  }

  .search-content {
    width: 100%;
    height: calc(100% - 54px);

    .better-scroll {
      height: calc(100% - 44px);
    }
  }
}

</style>