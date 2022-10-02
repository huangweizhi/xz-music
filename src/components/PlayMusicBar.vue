<script setup>
import { toRefs } from 'vue'
import { useMusicStore } from '@/stores'

const musicStore = useMusicStore()
const {playingList, playingIndex} = toRefs(musicStore)

</script>

<template>
  <div class="play-music-bar">
    <div class="left">
      <div class="image">
        <img :src="playingList[playingIndex].picUrl" alt="" />
      </div>
      <div class="text">
        <div class="name">{{playingList[playingIndex].name}}</div>
        <div>{{playingList[playingIndex].song.artists[0].name}}</div>
      </div>
    </div>
    <div class="right">
      <van-icon name="arrow-left" />
      <!-- <van-icon name="play-circle-o" /> -->
      <van-icon name="pause-circle-o" />
      <van-icon name="arrow" />
      <van-icon name="ellipsis" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.play-music-bar {
  width: 7rem;
  height: 50px;
  background-color: #fff;
  border-radius: 25px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 50%;

    .image {
      width: 50px;
      height: 50px;
      border-radius: 25px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .text {
      margin-left: 20px;
      width: calc(100% - 70px);
      overflow: hidden;
      .name {
        color: @textHightColor;
        font-size: 0.3rem;
      }
    }
  }

  .right {
    font-size: 30px;
    padding: 0 10px;
    width: 50%;
    display: flex;
    justify-content: end;
    align-items: center;
    flex-wrap: nowrap;

    .van-icon {
      margin-left: 10px;
    }
  }

}
</style>
    