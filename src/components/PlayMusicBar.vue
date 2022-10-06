<script setup>
import { toRefs, ref, onMounted } from 'vue'
import { useMusicStore } from '@/stores'
import PlayMusicList from './PlayMusicList.vue'
import PlayMusicDetail from './PlayMusicDetail.vue'

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

// 播放详情
const showPalyDetail = ref(false)
const clickShowPalyDetail = () => {
  showPalyDetail.value = true
}

</script>

<template>
  <div class="play-music-bar">
    <div class="left">
      <div class="image" @click="clickShowPalyDetail">
        <img :class="{'img-0': !isPlaying, 'img-1': isPlaying}" :src="playingList[playingIndex].picUrl + '?imageView&thumbnail=50y50'" alt="" />
      </div>
      <div class="text">
        <div class="name">{{playingList[playingIndex].name}}</div>
        <div>{{playingList[playingIndex].artist}}</div>
      </div>
    </div>
    
    <div class="right">
      <!-- 上一首 -->
      <svg class="icon" aria-hidden="true" @click="playPreMusic">
        <use xlink:href="#icon-shangyishouge"></use>
      </svg>
      <!-- 暂停状态按钮 -->
      <svg class="icon" aria-hidden="true"  v-if="!isPlaying" @click="clickPlay(true)" >
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <!-- 播放状态按钮 -->
      <svg class="icon" aria-hidden="true" v-if="isPlaying" @click="clickPlay(false)">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <!-- 下一首 -->
      <svg class="icon" aria-hidden="true" @click="playNextMusic">
        <use xlink:href="#icon-xiayishou"></use>
      </svg>
      <!-- 播放列表 -->
      <svg class="icon" aria-hidden="true" @click="clickShowPalyList">
        <use xlink:href="#icon-bofanggedan"></use>
      </svg>
    </div>

    <!-- 音频播放 -->
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playingList[playingIndex].id}.mp3`"></audio>
  
    <!-- 播放列表 -->
    <!-- 配合BetterScroll滚动 :lock-scroll="false" -->
    <van-action-sheet v-model:show="showPalyList" :lock-scroll="false" title="播放列表">
      <div class="play-list-content">
        <BetterScroll class="better-scroll">
          <PlayMusicList :data="playingList"></PlayMusicList>
        </BetterScroll>
      </div>
    </van-action-sheet>
  
    <!-- 播放详情 -->
    <!-- 配合BetterScroll滚动 :lock-scroll="false" -->
    <van-popup v-model:show="showPalyDetail" position="bottom" :style="{ height: '100%' }"
      closeable close-icon="arrow-down" close-icon-position="top-left" teleport="body" 
      :lock-scroll="false">
      <div class="play-detail">
        <!-- 播放详情 -->
        <PlayMusicDetail></PlayMusicDetail>
      </div>
    </van-popup>

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
  overflow: hidden;

  .left {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 50%;

    .image {
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 25px;
      }
      .img-0 {
        animation: rotate-ar 20s linear infinite;
        animation-play-state: paused;
      }
      .img-1 {
        animation: rotate-ar 20s linear infinite;
        animation-play-state: running;
      }
      @keyframes rotate-ar {
        0% {
          transform: rotateZ(0deg);
        }
        100% {
          transform: rotateZ(360deg);
        }
      }
    }

    .text {
      margin-left: 20px;
      width: calc(100% - 70px);
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
    .icon {
      margin-left: 10px;
    }
  }

}

.play-list-content {
  height: 7.5rem;
  padding: 0 0.1rem;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
    