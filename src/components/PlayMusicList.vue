<script setup>
import { defineProps, toRefs } from 'vue'
import { useMusicStore } from '@/stores'

const props = defineProps({ data: Array })
const musicStore = useMusicStore()
const { playingList, playingIndex, isPlaying } = toRefs(musicStore)

// 播放||暂停 歌单音乐
const playIndexOfMusic = (index, isPlay) => {
  musicStore.playIndexOfMusic(index, isPlay)
}

</script>

<template>
  <div class="song-list">
    <div class="item" v-for="(item, index) in props.data" :key="item.id">
      <div class="left">
        <!-- 正在播放 -->
        <svg class="icon" style="color: #57BEAD;" aria-hidden="true" v-if="item.id == playingList[playingIndex].id && isPlaying">
          <use xlink:href="#icon-a-zhengzaizhibozhengzaibofang"></use>
        </svg>
        <div class="index" v-else>{{ index+1 }}</div>
      </div>

      <div class="right">
        <div class="right-name">
          <div class="name">{{item.name}}</div>
          <div class="tips">{{item.artist}}</div>
        </div>

        <div class="right-btn">
          <svg class="icon" style="color: #57BEAD;" aria-hidden="true" @click="playIndexOfMusic(index, false)" v-if="item.id == playingList[playingIndex].id && isPlaying">
            <use xlink:href="#icon-zanting1"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="playIndexOfMusic(index, true)" v-else>
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

    .left {
      width: 1rem;
      height: 1rem;
      text-align: center;
      .index {
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.3rem;
      }
      .icon {
        margin-top: 0.3rem;
        font-size: 0.4rem;
      }
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
    