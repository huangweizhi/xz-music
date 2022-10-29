<script setup>
import { ref, onMounted } from 'vue'
import { getTopMV } from '@/api'
import MVList from '@/components/MVList.vue'

onMounted(() => {
  getMVList()
})

// mv排行
const mvList = ref([])
const getMVList = async () => {
  const res = await getTopMV()
  if(res.code !== 200) return 
  mvList.value = res.data
}

</script>

<template>
  <!-- mv -->
  <BetterScroll class="better-scroll">
    <MVList :data="mvList"></MVList>
  </BetterScroll>
</template>

<style lang="less" scoped>

</style>
    