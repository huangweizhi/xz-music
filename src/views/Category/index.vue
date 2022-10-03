<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCatlist } from '@/api'

const router = useRouter()

onMounted(() => {
  getCategoryList()
})

// 获取歌单分类列表
const categoryList = ref([])
const getCategoryList = async () => {
const {categories, sub} = await getCatlist()

// 数据处理
const categoryArr = []
for(let key in categories) {
  categoryArr.push({name: categories[key], category: key, children: []})
}
sub.forEach(item => {
  categoryArr.forEach(_item => {
    if(_item.category == item.category) {
      _item.children.push(item)
    }
  })
})
categoryList.value = categoryArr

}

// 分类歌单
const toPlayList = (type) => {
  router.push(`/category/${type}`)
}

</script>

<template>
  <!-- 分类列表 -->
  <div class="category">
    <div v-for="item in categoryList">
      <div class="divider"><van-divider>{{item.name}}</van-divider></div>
      <van-tag color="#fff" round size="large" text-color="#57BEAD"
        v-for="_item in item.children" @click="toPlayList(_item.name)">{{_item.name}}
      </van-tag>
    </div>
  </div>

</template>

<style lang="less" scoped>
.category {

  .divider {
    width: 100%;
    display: flex;
    justify-content: center;

    .van-divider {
      width: 30%;
      color: @textHightColor;
    }
  }

  .van-tag {
    margin: 0.1rem;
  }
}
</style>