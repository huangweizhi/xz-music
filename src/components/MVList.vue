<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router' 

const router = useRouter()
const props = defineProps({
  data: {
    type: Array,
    default: [],
    required: true
  }
})

// 查看mv
const clickItem = (item) => {
  router.push(`/mv/${item.id}`)
}

</script>

<template>
  <!-- mv -->
  <div class="mv">
    <div class="item" v-for="item in props.data" :key="item.id">
      <div class="top">
        <van-image
          width="3.4rem"
          height="1.8rem"
          :src="item.cover + '?imageView&thumbnail=300y150' " 
          @click="clickItem(item)"
        />
        <div class="play-count">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shipinbofangyingpian"></use>
          </svg>
          <span>{{item.playCount}}</span>
        </div>
      </div>
      <div class="footer">
        <div class="name">{{item.name}}</div>
        <div class="desc">{{item.desc || (item.mv ? item.mv.desc : '')}}</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.mv {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.1rem 0;

  .item {
    width: 3.4rem;
    height: 2.9rem;
    overflow: hidden;
    margin: 0.2rem 0;

    .top {
      position: relative;
      .play-count {
        position: absolute;
        bottom: 0.2rem;
        left: 0.1rem;
        color: #fff;
        * {
          margin-right: 0.1rem;
        }
      }
    }
    .footer {
      width: 3.4rem;
      height: 1.1rem;
      .name {
        line-height: 0.4rem;
        color: @textHightColor;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-break: break-all;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .desc {
        font-size: 0.2rem;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-break: break-all;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
    