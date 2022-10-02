<script setup>
import { defineProps, defineEmits } from 'vue'
import { useMusicStore } from '@/stores'

const props = defineProps({ data: Array })
const musicStore = useMusicStore()

// 播放歌单音乐
const playMusic = (musicList, index) => {
  musicStore.playListOfMusic(musicList, index)
}

</script>

<template>
  <div class="song-list">
    <div class="item" v-for="(item, index) in props.data" :key="item.id">
      <img :src="item.img1v1Url || item.picUrl" />
      <div class="right">
        <div class="right-name">
          <div class="name">{{item.name}}</div>
          <div class="tips">{{item.song.artists[0].name}}</div>
        </div>
        <div class="right-btn">
          <van-icon name="plus" size="0.3rem" @click="playMusic(props.data, index)" />
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
      }
    }
  }
}
</style>
  