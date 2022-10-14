<script setup>
import { toRefs, ref, onMounted, watch } from 'vue'
import { useMusicStore } from '@/stores'
import PlayMusicList from './PlayMusicList.vue'
import PlayMusicDetail from './PlayMusicDetail.vue'

const musicStore = useMusicStore()
const {playingList, playingIndex, isPlaying, currentTime, duration} = toRefs(musicStore)

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
// 查看mv时关闭 播放详情
const clickMV = () => {
  showPalyDetail.value = false
}

// 播放进度
const currentRate = ref(0) // 动画过程中的实时进度
const percentage = ref(0) // 进度条
watch(currentTime, ()=> {
  // 进度条
  if(currentTime.value && duration.value) {
    percentage.value = parseInt((currentTime.value/duration.value)*100)
  }
  else {
    percentage.value = 0
  }
})

</script>

<template>
  <div class="play-music-bar">
    <div class="left">
      <div class="image" @click="clickShowPalyDetail">
        <!-- 当 rate 发生变化时，v-model:current-rate 会以 speed 的速度变化，直至达到 rate 设定的值 -->
        <van-circle
          v-model:current-rate="currentRate"
          :rate="percentage"
          :speed="50"
          color="#57BEAD"
          layer-color="#F5F5F5"
        >
          <img :class="{'img-0': !isPlaying, 'img-1': isPlaying}" :src="playingList[playingIndex].picUrl + '?imageView&thumbnail=50y50'" alt="" />
        </van-circle>
      </div>
      <div class="text">
        <div class="name">{{playingList[playingIndex].name}}</div>
        <div>{{playingList[playingIndex].artist}}</div>
      </div>
    </div>
    
    <div class="right">
      <!-- 上一首 -->
      <svg class="icon" aria-hidden="true" @click="playPreMusic">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <!-- 暂停状态按钮 -->
      <svg class="icon" aria-hidden="true"  v-if="!isPlaying" @click="clickPlay(true)" >
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <!-- 播放状态按钮 -->
      <svg class="icon" aria-hidden="true" v-if="isPlaying" @click="clickPlay(false)">
        <use xlink:href="#icon-zanting1"></use>
      </svg>
      <!-- 下一首 -->
      <svg class="icon" aria-hidden="true" @click="playNextMusic">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <!-- 播放列表 -->
      <svg class="icon" aria-hidden="true" @click="clickShowPalyList">
        <use xlink:href="#icon-24gf-playlistMusic5"></use>
      </svg>
    </div>

    <!-- 音频播放 -->
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playingList[playingIndex].id}.mp3`" preload="none"></audio>
  
    <!-- 播放列表 -->
    <!-- 配合BetterScroll滚动 :lock-scroll="false" -->
    <van-action-sheet v-model:show="showPalyList" :lock-scroll="false" teleport="body" title="播放列表">
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
        <PlayMusicDetail @clickMV="clickMV"></PlayMusicDetail>
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
    width: 55%;

    .image {
      width: 50px;
      height: 50px;
      .van-circle {
        width: 100%;
        height: 100%;
      }
      img {
        width: 46px;
        height: 46px;
        border-radius: 23px;
        margin: 2px;
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
        
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-break: break-all;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }

  .right {
    font-size: 0.45rem;
    padding: 0 10px;
    width: 45%;
    display: flex;
    justify-content: end;
    align-items: center;
    flex-wrap: nowrap;

    .icon {
      margin-left: 0.3rem;
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
    