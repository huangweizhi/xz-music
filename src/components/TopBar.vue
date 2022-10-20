<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({ title: String })

</script>

<template>
  <van-sticky>
    <div class="top-bar">
      <div class="left">
        <van-icon name="arrow-left" @click="router.go(-1)" />
      </div>
      <div class="center">{{props.title}}</div>
      <div class="right"></div>
    </div>
  </van-sticky>
</template>

<style lang="less" scoped>
.top-bar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  height: 50px;
  width: 100%;
  line-height: 50px;
  color: @textHightColor;
  background-color: @backgroundHightColor;

  .left {
    flex: 1;
    height: 100%;
    text-align: center;
    font-size: 20px;
  }
  .center {
    flex: 5.5;
    height: 100%;
    text-align: center;
    font-size: 18px;
  }
  .right {
    flex: 1;
    height: 100%;
  }
}
</style>