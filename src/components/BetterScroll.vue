<script setup>
import { ref, onMounted, defineExpose, defineProps } from 'vue'
import BScroll from '@better-scroll/core'

const props = defineProps({scrollX: Boolean, scrollY: Boolean})

const scroll = ref(null)
const wrapper = ref(null)

onMounted(() => {
  scroll.value = new BScroll(wrapper.value, {
    click: true,
    scrollX: props.scrollX || false,
    scrollY: props.scrollY || true
  })
  // BetterScroll 重新计算
  scroll.value.on('beforeScrollStart', () => {
    refresh()
  })
})

/**
 * API方法
*/ 
// 滚动返回顶部
const scrollTo = (x, y, time=1000) => {
  scroll.value.scrollTo(x, y, time)
}
// BetterScroll 重新计算
const refresh = () => {
  scroll.value.refresh()
}

// 暴露出去的属性
defineExpose({scrollTo, refresh})

</script>

<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
  