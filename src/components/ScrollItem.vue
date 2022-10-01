<script setup>
import { defineProps } from 'vue'

const props = defineProps({ data: Array })

</script>

<template>
  <div class="scroll-item">
    <div class="item" v-for="item in props.data" :key="item.id">
      <img :src="item.img1v1Url || item.picUrl" alt="" />
      <div>{{item.name}}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.scroll-item {
  width: 100%;
  min-height: 2.7rem;
  display: flex;
  justify-content: start;
  flex-wrap: nowrap;
  overflow-x: scroll;
  padding: 0.1rem 0;

  .item {
    text-align: center;
    margin-right: 0.14rem;

    img {
      width: 2rem;
      height: 2rem;
    }

    div {
      height: 0.7rem;
      overflow: hidden;
      line-height: 0.35rem;
    }
  }
}
</style>
  