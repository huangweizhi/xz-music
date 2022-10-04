<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import Title from '@/components/Title.vue'
import ScrollItem from '@/components/ScrollItem.vue'

import { getPersonalized } from '@/api'

const router = useRouter()

onBeforeMount(() => {
  getPersonalizedData()
})

// 进入歌单详情
const clickItem = (id) => {
  router.push(`playlist/${id}`)
}

/**
 * 获取推荐歌单
 */
const personalizedList = ref([])
const getPersonalizedData = async () => {
  const res = await getPersonalized()
  if(res.code !== 200) return 
  personalizedList.value = res.result
}
</script>

<template>
  <Title name="推荐歌单"></Title>
  <scroll-item :data="personalizedList" @clickItem="clickItem"></scroll-item>
</template>

<style lang="less" scoped>

</style>
  