<script setup>
  import { ref, onBeforeMount } from 'vue'
  import Title from '@/components/Title.vue'
  import ScrollItem from '@/components/ScrollItem.vue'
  
  import { getPersonalized } from '@/api'
  
  onBeforeMount(() => {
    getPersonalizedData()
  })
  
  /**
   * 获取推荐歌单
   */
  const personalizedList = ref()
  const getPersonalizedData = async () => {
    const res = await getPersonalized()
    personalizedList.value = res.result
  }
  </script>
  
  <template>
    <Title name="推荐歌单"></Title>
    <scroll-item :data="personalizedList"></scroll-item>
  </template>
  
  <style lang="less" scoped>
  
  </style>
    