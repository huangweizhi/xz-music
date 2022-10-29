<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPalyList } from '@/api'

import ItemList from '@/components/ItemList.vue'

const route = useRoute()
const router = useRouter()

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
    <!-- 歌单列表 -->
    <ItemList :data="palyList" @clickItem="toDetail"></ItemList>
  </BetterScroll>
</template>

<style lang="less" scoped>

</style>
    