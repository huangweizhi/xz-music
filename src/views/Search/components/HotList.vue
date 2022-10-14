<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import { searchHotDetail } from '@/api'

onMounted(() => {
  getHotList()
})

// 获取热搜列表
const hotList = ref([])
const getHotList = async () => {
  const res = await searchHotDetail()
  if(res.code !== 200) return
  hotList.value = res.data
}

const emits = defineEmits(['clickItem'])
// 点击热搜选项
const clickItem = (searchWord) => {
  emits('clickItem', searchWord)
}

</script>

<template>
  <div class="hot-list">
    <div class="item" v-for="(item, index) in hotList">
      <div class="left">
        <div class="index" :style="index < 3 ? 'color: #EE0A24;': ''">{{index+1}}</div>
        <div class="search-word" @click="clickItem(item.searchWord)">{{item.searchWord}}</div>
      </div>
      <div class="right">{{item.score}}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.hot-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .item {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    line-height: 1rem;

    .left {
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;

      .index {
        width: 1rem;
        height: 1rem;
        text-align: center;
      }
      .search-word {
        height: 1rem;
        font-size: 0.3rem;
        color: @textHightColor;
      }
    }
  }
}
</style>