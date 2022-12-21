<script setup>
import { ref, onMounted, defineExpose, defineProps, defineEmits } from 'vue'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import PullDown from '@better-scroll/pull-down'

BScroll.use(Pullup)
BScroll.use(PullDown)

const props = defineProps({
  scrollX: Boolean, 
  scrollY: Boolean, 
  usePullUp: Boolean,
  usePullDown: Boolean
})
const scroll = ref(null)
const wrapper = ref(null)

onMounted(() => {
  scroll.value = new BScroll(wrapper.value, {
    click: true,
    scrollX: props.scrollX || false,
    scrollY: props.scrollY || true,
    pullUpLoad: props.usePullUp || false,
    pullDownRefresh: props.usePullDown || false
  })

  // BetterScroll 重新计算
  scroll.value.on('beforeScrollStart', () => {
    refresh()
  })
  if(props.usePullUp) {
    // 触底加载
    scroll.value.on('pullingUp', pullingUp)
  }
  if(props.usePullDown) {
    // 下拉刷新
    scroll.value.on('pullingDown', pullingDown)
  }
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
// 结束上拉加载行为
const finishPullUp = () => {
  isPullUpLoad.value = false
  scroll.value.finishPullUp()
}
// 结束下拉刷新行为
const finishPullDown = () => {
  isPullingDown.value = false
  scroll.value.finishPullDown()
}

/**
 * 发送事件
 */
const emits = defineEmits(['pullingUp', 'pullingDown'])
// 触底加载
const isPullUpLoad = ref(false)
const pullingUp = () => {
  isPullUpLoad.value = true
  emits('pullingUp')
}
// 下拉刷新
const isPullingDown = ref(false)
const pullingDown = () => {
  isPullingDown.value = true
  emits('pullingDown')
}

/**
 * 暴露出去的属性
 */
defineExpose({scrollTo, refresh, finishPullUp, finishPullDown})

</script>

<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <div class="pulldown-tips" v-if="isPullingDown">
        刷新中...
      </div>
      <slot></slot>
      <div class="pullup-tips" v-if="isPullUpLoad">
        加载中...
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.pulldown-tips {
  text-align: center;
  padding: 0.4rem 0;
}
.pullup-tips {
  text-align: center;
  padding: 0.4rem 0;
}
</style>
  