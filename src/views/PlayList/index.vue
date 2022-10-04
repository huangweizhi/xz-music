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
  <div class="play-list">
    <div class="item" v-for="item in palyList">
      <img :src="item.coverImgUrl" alt="" @click="toDetail(item.id)" />
      <div>{{item.name}}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.play-list {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow-y: scroll;
  padding: 0.1rem 0;

  .item {
    width: 33.33%;
    text-align: center;
    margin: 0.1rem 0;

    img {
      width: 2rem;
      height: 2rem;
    }

    div {
      height: 0.7rem;
      width: 2rem;
      overflow: hidden;
      line-height: 0.35rem;
    }
  }
}
</style>
    