<script setup>
import { defineProps } from 'vue'
import { useMusicStore } from '@/stores'

const props = defineProps({ data: Array, showImg: Boolean })
const musicStore = useMusicStore()

// 播放歌单音乐
const playMusic = (musicList, index) => {
  musicStore.playListOfMusic(musicList, index)
}

</script>

<template>
  <div class="song-list">
    <div class="item" v-for="(item, index) in props.data" :key="item.id">
      <img v-if="props.showImg" :src="item.picUrl + '?imageView&thumbnail=50y50'" />
      <div v-else class="index">{{index+1}}</div>
      <div class="right">
        <div class="right-name">
          <div class="name">{{item.name}}</div>
          <div class="tips">{{item.artist}}</div>
        </div>
        <div class="right-btn">
          <svg class="icon" aria-hidden="true" @click="playMusic(props.data, index)" >
            <use xlink:href="#icon-bofang"></use>
          </svg>
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

  .item {
    display: flex;
    width: 100%;
    margin: 0.1rem 0;

    img {
      width: 1rem;
      height: 1rem;
      border-radius: 0.1rem;
    }
    .index {
      width: 1rem;
      height: 1rem;
      text-align: center;
      line-height: 1rem;
      font-size: 0.3rem;
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
        }
      }

      .right-btn {
        display: flex;
        flex-wrap: nowrap;
        font-size: 0.4rem;
      }
    }
  }
}
</style>
  