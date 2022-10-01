<script setup>
import { defineProps } from 'vue'

const props = defineProps({ name: String })

</script>

<template>
  <div class="title">
    <div class="txt">{{props.name}}</div>
  </div>
</template>

<style lang="less" scoped>
.title {
  height: 0.4rem;
  align-items: center;
  margin: 0.2rem 0;

  .txt {
    font-size: 0.36rem;
    color: @textHightColor;
    height: 100%;
    position: relative;
    padding-left: 0.2rem;

    &::before {
      display: block;
      width: 0.05rem;
      height: 0.26rem;
      background: @theme-color;
      content: "";
      position: absolute;
      left: 0;
      top: 70%;
      margin-top: -0.15rem;
    }
  }

}

</style>
  