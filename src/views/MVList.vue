<script setup>
import { ref, onMounted } from 'vue'
import { getTopMV } from '@/api'
import MVList from '@/components/MVList.vue'

onMounted(() => {
  getMVList()
})

// 分页参数
let offset = 0
const limit = 30

// mv排行
const mvList = ref([])
const getMVList = async () => {
  const res = await getTopMV(limit, offset)
  if(res.code !== 200) return false
  mvList.value = [...mvList.value, ...res.data]
  // 下一页数
  offset++
  return true
}

// 加载下一页
const betterScroll = ref(null)
const pullingUp = async () => {
  const res = await getMVList()
  if(res) {
    betterScroll.value.refresh()
    betterScroll.value.finishPullUp()
  }
}

</script>

<template>
  <!-- mv -->
  <BetterScroll class="better-scroll" @pullingUp="pullingUp" :usePullUp="true" ref="betterScroll">
    <MVList :data="mvList"></MVList>
  </BetterScroll>
</template>

<style lang="less" scoped>

</style>
    