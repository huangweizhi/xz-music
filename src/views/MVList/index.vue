<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router' 
import { getTopMV } from '@/api'

const router = useRouter()

onMounted(() => {
  getMVList()
})

// mv排行
const mvList = ref([])
const getMVList = async () => {
  const res = await getTopMV()
  if(res.code !== 200) return 
  mvList.value = res.data
  console.log(mvList.value)
}

// 查看mv
const clickItem = (item) => {
  router.push(`/mv/${item.mv.id}`)
}

</script>

<template>
  <!-- mv -->
  <BetterScroll class="better-scroll">
    <div class="mv">
      <div class="item" v-for="item in mvList" :key="item.id">
        <img :src="item.cover" @click="clickItem(item)" />
        <div class="footer">{{item.name}}</div>
      </div>
    </div>
  </BetterScroll>
</template>

<style lang="less" scoped>
.mv {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    width: 3.4rem;
    height: 2.8rem;
    overflow: hidden;
    margin: 0.1rem 0;

    img {
      width: 3.4rem;
      height: 1.8rem;
    }
    .footer {
      width: 3.4rem;
      height: 1rem;
    }
  }
}
</style>
    