<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({ data: Array })

const emits = defineEmits(['clickItem'])
// 点击
const clickItem = (id) => {
  emits('clickItem', id)
}

</script>

<template>
  <BetterScroll class="better-scroll" :scrollX="true" :scrollY="false">
    <div class="scroll-item">
      <div class="item" v-for="item in props.data" :key="item.id">
        <van-image
          width="2rem"
          height="2rem"
          radius="0.2rem"
          :src="(item.img1v1Url || item.picUrl) + '?imageView&thumbnail=100y100'" 
          @click="clickItem(item.id)"
        />
        <div class="name">{{item.name}}</div>
      </div>
    </div>
  </BetterScroll>
</template>

<style lang="less" scoped>
.scroll-item {
  width: 100%;
  min-height: 2.7rem;
  display: flex;
  justify-content: start;
  flex-wrap: nowrap;
  padding: 0.1rem 0;

  .item {
    text-align: center;
    margin-right: 0.14rem;
    .name {
      height: 0.7rem;
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
.better-scroll {
  min-height: 2.7rem;
}
</style>
  