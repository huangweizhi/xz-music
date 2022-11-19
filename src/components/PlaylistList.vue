<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({ data: Array, title: String, tool: Object })

// 点击歌单
const clickPlaylist = async (item) => {
  const {id} = item
  router.push(`/playlist/${id}`)
}

</script>

<template>
  <div class="song-list">
    <div class="top" v-if="props.title">
      <div>{{props.title}}</div>
      <div class="btn" v-if="props.tool">
        <svg v-if="props.tool.add" class="icon" aria-hidden="true">
          <use xlink:href="#icon-tianjia1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo-10"></use>
        </svg>
      </div>
    </div>
    <div class="item" v-for="item in props.data" :key="item.id">
      <div class="left" @click="clickPlaylist(item)">
        <van-image
          width="1rem"
          height="1rem"
          radius="0.1rem"
          :src="item.coverImgUrl + '?imageView&thumbnail=50y50'"
        />
      </div>

      <div class="right">
        <div class="right-name" @click="clickPlaylist(item)">
          <div class="name">{{item.name}}</div>
          <div class="tips">
            {{item.trackCount}}首
          </div>
        </div>
        <div class="right-btn">
          
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.song-list {
  width: 100%;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 0.2rem;
  padding: 0.2rem;
  box-sizing: border-box;

  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn {
      .icon {
        margin-left: 0.3rem;
      }
    }
  }

  .item {
    display: flex;
    width: 100%;
    margin: 0.1rem 0;

    .left {
      width: 1rem;
      height: 1rem;
    }

    .right {
      width: calc(100% - 1rem);
      height: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.1rem 0.2rem;
      box-sizing: border-box;

      .right-name {
        .name {
          color: @textHightColor;
          font-size: 0.3rem;

          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          word-break: break-all;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .tips {
          color: @textColor;
        }
      }

      .right-btn {
        display: flex;
        flex-wrap: nowrap;
        font-size: 0.4rem;
        color: @textColor;
        * {
          margin-left: 0.2rem;
        }
      }
    }
  }
}
</style>
  