<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: [],
    required: true
  }
})

const emits = defineEmits(['clickItem'])
// 点击
const clickItem = (id) => {
  emits('clickItem', id)
}

</script>

<template>
  <div class="list">
    <div class="item" v-for="item in props.data">
      <div class="image">
        <van-image
          width="2.2rem"
          height="2.2rem"
          radius="0.2rem"
          :src="(item.coverImgUrl || item.img1v1Url || item.picUrl) + '?imageView&thumbnail=100y100'"
          @click="clickItem(item.id)"
        />
      </div>
      <div>{{item.name}}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.list {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0.1rem 0;

  .item {
    width: 33.33%;
    text-align: center;
    margin: 0.2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .image {
      width: 2.2rem;
      height: 2.2rem;
    }

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
    