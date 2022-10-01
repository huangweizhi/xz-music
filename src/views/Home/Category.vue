<script setup>
import { ref } from 'vue'

</script>

<template>
  <!-- 分类 -->
  <div class="catygory">
    <div class="item">
      <img src="@/assets/img/category/分类.png" />
      <div>分类</div>
    </div>

    <div class="item">
      <img src="@/assets/img/category/点赞.png" />
      <div>每日推荐</div>
    </div>

    <div class="item">
      <img src="@/assets/img/category/播放.png" />
      <div>MV</div>
    </div>

    <div class="item">
      <img src="@/assets/img/category/搜索.png" />
      <div>搜索</div>
    </div>
    
    <div class="item">
      <img src="@/assets/img/category/个人中心.png" />
      <div>个人中心</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.catygory {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.1rem 0;

  .item {
    width: 20%;
    text-align: center;

    img {
      width: 1.1rem;
      height: 1.1rem;
    }
  }
}
</style>
