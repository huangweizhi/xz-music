<script setup>
import { ref, defineProps, defineEmits } from "vue"

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: '搜索'
  }
})

const emits = defineEmits(['onSearch', 'clickInput'])

// 搜索关键字
const searchWord = ref('')
// 输入框搜索
const onSearch = () => {
  emits('onSearch', searchWord.value)
}
const clickInput = () => {
  emits('clickInput')
}

</script>

<template>
  <!-- 搜索 -->
  <div class="search-bar">
    <div class="bar-item">
      <slot name="left"></slot>
    </div>
    <div class="bar-search">
      <van-search
        v-model="searchWord"
        shape="round"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        @search="onSearch"
        @click-input="clickInput"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.search-bar {
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  background-color: #fff;

  .bar-search {
    flex: 8;
  }
  .bar-item {
    flex: 1;
    color: @textColor;
    font-size: 0.45rem;
    text-align: center;
  }
}

</style>