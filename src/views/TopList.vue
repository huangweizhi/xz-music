<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getToplist } from '@/api'

const router = useRouter()

onMounted(() => {
  getToplistData()
})

// 获取榜单数据
const toplist = ref([])
const getToplistData = async () => {
  const res = await getToplist()
  if(res.code !== 200) return
  toplist.value = res.list
}

// 查看榜单
const clickItem = (id) => {
  router.push(`/playlist/${id}`)
}

</script>

<template>
  <BetterScroll class="better-scroll">
    <div class="top-list">
      <div class="item" v-for="item in toplist" :key="item.id" @click="clickItem(item.id)" >
        <div class="left">
          <van-image
            width="2.6rem"
            height="2.6rem"
            radius="0.3rem"
            :src="item.coverImgUrl + '?imageView&thumbnail=200y200'"
          />
          <div class="update">{{item.updateFrequency}}</div>
        </div>
        <div class="right">
          <div class="name">{{item.name}}</div>
          <div class="desc">{{item.description}}</div>
        </div>
      </div>
    </div>
  </BetterScroll>
</template>

<style lang="less" scoped>
.top-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .item {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    margin-top: 0.3rem;

    .left {
      width: 2.6rem;
      height: 2.6rem;
      position: relative;
      .update {
        position: absolute;
        bottom: 0.05rem;
        left: 0.15rem;
        color: #fff;
      }
    }

    .right {
      width: 4.5rem;
      height: 2.6rem;
      padding-left: 0.2rem;
      overflow: hidden;
      .name {
        font-size: 0.3rem;
        color: @textHightColor;
        line-height: 0.6rem;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-break: break-all;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .desc {
        line-height: 0.4rem;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-break: break-all;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
    