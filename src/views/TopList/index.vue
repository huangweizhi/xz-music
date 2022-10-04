<script setup>
import { ref, onMounted } from 'vue'
import { getToplist } from '@/api'


onMounted(() => {
  getToplistData()
})

// 获取榜单数据
const getToplistData = async () => {
  const res = await getToplist()
  console.log(res)
}
</script>

<template>
  <div class="top-list">
    
  </div>
</template>

<style lang="less" scoped>

</style>
    