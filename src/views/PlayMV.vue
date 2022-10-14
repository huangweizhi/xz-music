<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getMVUrl, getMVDetail } from '@/api'

const route = useRoute()

onMounted(() => {
  getMVUrlData()
  getMVDetailData()
})

// mv 地址
const mvUrl = ref('')
const getMVUrlData = async () => {
  const res = await getMVUrl(route.params.id)
  if(res.code !== 200) return
  mvUrl.value = res.data.url
}

// 获取 mv 数据
const mvDetail = ref({})
const getMVDetailData = async () => {
  const res = await getMVDetail(route.params.id)
  if(res.code !== 200) return
  mvDetail.value = res.data
}

</script>

<template>
  <!-- mv -->
  <div class="mv">
    <video :src="mvUrl" controls="controls" controlslist="nodownload"></video>
    <div class="detail" v-if="mvDetail.name">
      <div class="artist">
        <img :src="mvDetail.artists[0].img1v1Url + '?imageView&thumbnail=50y50' " alt="" />
        <div class="artistName">
          {{mvDetail.artists[0].name}}
        </div>
      </div>
      <div class="name">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shipinbofangyingpian"></use>
        </svg>
        <span>{{mvDetail.name}}</span>
      </div>
      <div class="desc">{{mvDetail.desc}}</div>
      <div class="time">
        <span>{{mvDetail.playCount}}次观看  {{mvDetail.publishTime}}</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.mv {
  width: 100%;

  video {
    width: 7.1rem;
    height: 3.99rem;
    background-color: #000;
  }

  .detail {
    width: 100%;
    padding: 0.2rem 0;
    .artist {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        height: 40px;
        width: 40px;
        border-radius: 20px;
      }
      .artistName {
        margin: 0 0.2rem;
        font-size: 0.3rem;
        color: @textHightColor;
      }
    }
    .name {
      margin: 0.1rem 0;
      font-size: 0.34rem;
      color: @textHightColor;
      * {
        margin-right: 0.1rem;
      }
    }
    .desc {
      margin: 0.1rem 0;
      line-height: 0.4rem;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      word-break: break-all;
      -webkit-line-clamp: 10;
      -webkit-box-orient: vertical;
    }
    .time {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.2rem 0;
      font-size: 0.2rem;
    }
  }

}
</style>
    