<script setup>
import { ref, onMounted, defineExpose, defineProps, defineEmits } from 'vue'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup)

const props = defineProps({scrollX: Boolean, scrollY: Boolean, usePullUp: Boolean})
const scroll = ref(null)
const wrapper = ref(null)

onMounted(() => {
  scroll.value = new BScroll(wrapper.value, {
    click: true,
    scrollX: props.scrollX || false,
    scrollY: props.scrollY || true,
    pullUpLoad: props.usePullUp || false
  })
  // BetterScroll 重新计算
  scroll.value.on('beforeScrollStart', () => {
    refresh()
  })
  if(props.usePullUp) {
    // 触底加载
    scroll.value.on('pullingUp', pullingUp)
  }
})

const isPullUpLoad = ref(false)

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

// 暴露出去的属性
defineExpose({scrollTo, refresh, finishPullUp})

const emits = defineEmits(['pullingUp'])
// 触底加载
const pullingUp = () => {
  isPullUpLoad.value = true
  emits('pullingUp')
}

</script>

<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
      <div class="pullup-tips" v-if="isPullUpLoad">
        加载中...
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.pullup-tips {
  text-align: center;
  padding: 0.4rem 0;
}
</style>
  