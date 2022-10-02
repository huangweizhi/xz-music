<script setup>
import { toRefs, ref, onMounted } from 'vue'
import { useMusicStore } from '@/stores'
import PlayMusicList from './PlayMusicList.vue'

const musicStore = useMusicStore()
const {playingList, playingIndex, isPlaying} = toRefs(musicStore)

// 更新 播放 || 暂停 状态
const audio = ref(null)
const clickPlay = (isPlaying) => {
  musicStore.updateIsPlaying(isPlaying)
}

// 更新播放器对象
onMounted(() => {
  musicStore.updateAudio(audio.value)
})

// 上一首
const playPreMusic = () => {
  musicStore.playPreMusic()
}

// 下一首
const playNextMusic = () => {
  musicStore.playNextMusic()
}

// 播放列表
const showPalyList = ref(false)
const clickShowPalyList = () => {
  showPalyList.value = true
}

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
      <!-- 上一首 -->
      <van-icon name="arrow-left" @click="playPreMusic" />
      <!-- 暂停状态按钮 -->
      <van-icon name="play-circle-o" v-if="!isPlaying" @click="clickPlay(true)" />
      <!-- 播放状态按钮 -->
      <van-icon name="pause-circle-o" v-if="isPlaying" @click="clickPlay(false)" />
      <!-- 下一首 -->
      <van-icon name="arrow" @click="playNextMusic" />
      <!-- 播放列表 -->
      <van-icon name="ellipsis" @click="clickShowPalyList" />
    </div>

    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playingList[playingIndex].id}.mp3`"></audio>
  
    <van-action-sheet v-model:show="showPalyList" title="播放列表">
      <div class="play-list-content">
        <PlayMusicList :data="playingList"></PlayMusicList>
      </div>
    </van-action-sheet>
  
  </div>
</template>

<style lang="less" scoped>
.play-music-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 7rem;
  height: 50px;
  background-color: #F5F5F5;
  border-radius: 25px;

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

.play-list-content {
  height: 7.5rem;
  padding: 0 0.1rem;
  box-sizing: border-box;
}
</style>
    