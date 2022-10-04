<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const toPage = (path) => {
  router.push(path)
}

</script>

<template>
  <!-- 分类 -->
  <div class="catygory">
    <div class="item">
      <img src="@/assets/img/category/分类.png" @click="toPage('/category')" />
      <div>分类</div>
    </div>

    <div class="item">
      <img src="@/assets/img/category/点赞.png" @click="toPage('/recommend/songs')" />
      <div>每日推荐</div>
    </div>

    <div class="item">
      <img src="@/assets/img/category/播放.png" @click="toPage('/category')" />
      <div>MV</div>
    </div>

    <div class="item">
      <img src="@/assets/img/category/搜索.png" @click="toPage('/category')" />
      <div>搜索</div>
    </div>
    
    <div class="item">
      <img src="@/assets/img/category/个人中心.png" @click="toPage('/user')" />
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
