<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPalyList } from '@/api'
import router from '@/router'

const route = useRoute()

onMounted(() => {
  getPalyListData(route.params.type)
})

// 获取分类下的歌单
const palyList = ref([])
const getPalyListData = async (type) => {
  const res = await getPalyList(type)
  if(res.code !== 200) return 
  palyList.value = res.playlists
}

// 查看歌单详情
const toDetail = (id) => {
  router.push(`/playlist/${id}`)
}

</script>

<template>
  <BetterScroll class="better-scroll">
    <div class="play-list">
      <div class="item" v-for="item in palyList">
        <van-image
          width="2.2rem"
          height="2.2rem"
          radius="0.2rem"
          :src="item.coverImgUrl + '?imageView&thumbnail=100y100'"
          @click="toDetail(item.id)"
        />
        <div>{{item.name}}</div>
      </div>
    </div>
  </BetterScroll>
</template>

<style lang="less" scoped>
.play-list {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  overflow-y: scroll;
  padding: 0.1rem 0;

  .item {
    width: 2.2rem;
    text-align: center;
    margin: 0.1rem 0 0.2rem 0;

    div {
      height: 0.7rem;
      width: 2.2rem;
      overflow: hidden;
      line-height: 0.35rem;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      word-break: break-all;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
    