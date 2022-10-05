<script setup>
import { ref, toRefs, watch, computed } from 'vue'
import { useMusicStore } from '@/stores'
import PlayMusicList from './PlayMusicList.vue'
import { getLyric } from '@/api'
import { setLyric, formatSeconds } from '@/utils'

const musicStore = useMusicStore()
const {playingList, playingIndex, isPlaying, lyricList, currentTime, duration} = toRefs(musicStore)

// 更新 播放 || 暂停 状态
const clickPlay = (isPlaying) => {
  musicStore.updateIsPlaying(isPlaying)
}

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

// 展示唱片或歌词
const showLyric = ref(false)
const changeContent = () => {
  showLyric.value = !showLyric.value
  if(showLyric.value) {
    getLyricData()
  }
}

// 获取歌词
const getLyricData = async () => {
  const id = playingList.value[playingIndex.value].id
  const res = await getLyric(id)
  if(res.code !== 200) return
  musicStore.updateLyricList(setLyric(res.lrc.lyric))
}

// 歌词滚动
const lyricRef = ref(null)
const percentage = ref(0)
watch(currentTime, ()=> {
  // 歌词滚动
  if(showLyric.value) {
    const p = window.document.querySelector('p.lyric-active')
    if( p && p.offsetTop > 260) {
      lyricRef.value.scrollTop = p.offsetTop - 260
    }
  }
  // 进度条
  let _percentage = parseInt((currentTime.value/duration.value)*100)
  if(_percentage>100) {
    _percentage = 100
  }
  percentage.value = _percentage
})

// 进度条开始时间
const getCurrentTime = computed(()=> {
  if(currentTime.value) {
    return formatSeconds(currentTime.value)
  }
  return '00:00'
})
// 进度条结束时间
const getEndTime = computed(()=> {
  if(duration.value) {
    return formatSeconds(duration.value)
  }
  return '00:00'
})

</script>

<template>
  <div class="music-detail">
    <!-- 背景图片 -->
    <img class="bg-img" :src="playingList[playingIndex].picUrl + '?imageView&thumbnail=750y750' " />

    <!-- 唱片 -->
    <div class="disc" v-show="!showLyric" @click="changeContent">
      <img :class="{'disc-needle': true, 'disc-needle-0': !isPlaying}" src="@/assets/img/play/needle-ab.png" />
      <img class="disc-cd" src="@/assets/img/play/disc_circle.png" />
      <img :class="{'disc-ar': true, 'disc-ar-0': !isPlaying, 'disc-ar-1': isPlaying}" 
        :src="playingList[playingIndex].picUrl + '?imageView&thumbnail=750y750' " />
    </div>

    <!-- 歌词 -->
    <div class="lyric" ref="lyricRef" v-show="showLyric" @click="changeContent">
      <p v-for="item in lyricList" 
        :class="{'lyric-active': (currentTime > item.startTime) && (currentTime < item.endTime)} ">
        {{item.lrcstr}}
      </p>
    </div>

    <!-- 底部 -->
    <div class="footer">
      <!-- 进度条 -->
      <div class="time-bar">
        <div class="text">{{getCurrentTime}}</div>
        <div class="time-bar-pro">
          <van-progress stroke-width="2px" color="#57BEAD" :show-pivot="false" :percentage="percentage" />
        </div>
        <div class="text">{{getEndTime}}</div>
      </div>
      <!-- 按钮 -->
      <div class="tool-bar">
        <!-- 播放模式 -->
        <div>
          <svg class="icon" aria-hidden="true" @click="">
            <use xlink:href="#icon-suijibofang"></use>
          </svg>
        </div>
        <!-- 上一首 -->
        <div>
          <svg class="icon" aria-hidden="true" @click="playPreMusic">
            <use xlink:href="#icon-shangyishouge"></use>
          </svg>
        </div>
        <!-- 暂停状态按钮 -->
        <div v-if="!isPlaying">
          <svg class="icon" aria-hidden="true" @click="clickPlay(true)" >
            <use xlink:href="#icon-bofang"></use>
          </svg>
        </div>
        <!-- 播放状态按钮 -->
        <div v-if="isPlaying">
          <svg class="icon" aria-hidden="true" @click="clickPlay(false)">
            <use xlink:href="#icon-zanting"></use>
          </svg>
        </div>
        <!-- 下一首 -->
        <div>
          <svg class="icon" aria-hidden="true" @click="playNextMusic">
            <use xlink:href="#icon-xiayishou"></use>
          </svg>
        </div>
        <!-- 播放列表 -->
        <div>
          <svg class="icon" aria-hidden="true" @click="clickShowPalyList">
            <use xlink:href="#icon-bofanggedan"></use>
          </svg>
        </div>
      </div>
    </div>

    <!-- 播放列表 -->
    <van-action-sheet v-model:show="showPalyList" title="播放列表">
      <div class="play-list-content">
        <PlayMusicList :data="playingList"></PlayMusicList>
      </div>
    </van-action-sheet>
  </div>
</template>

<style lang="less" scoped>
.music-detail {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: black;

  .bg-img {
    position: absolute;
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.4;
    z-index: 0;
  }

  .disc {
    display: flex;
    position: relative;
    width: 100%;
    margin-top: 0.5rem;
    flex-direction: column;
    align-items: center;
    
    .disc-needle {
      width: 1.875rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(0deg);
      transition: all 2s;
      z-index: 2;
    }
    .disc-needle-0 {
      transform: rotate(-15deg);
      transition: all 2s;
    }

    .disc-cd {
      width: 5rem;
      height: 5rem;
      position: absolute;
      top: 1.75rem;
      z-index: 1;
    }

    .disc-ar {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      position: absolute;
      top: 2.65rem;
      z-index: 2;
    }
    .disc-ar-0 {
      animation: rotate-ar 20s linear infinite;
      animation-play-state: paused;
    }
    .disc-ar-1 {
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

  .lyric {
    width: 100%;
    position: relative;
    height: calc(100vh - 3.3rem);
    margin: 1rem 0;
    overflow-y: scroll;
    text-align: center;
    padding: 0 0.3rem;
    box-sizing: border-box;
    font-size: 0.3rem;

    .lyric-active {
      font-size: 0.4rem;
      color: @theme-color;
      transition: all 0.5s;
    }
  }

  .footer {
    position: absolute;
    width: 100%;
    bottom: 0.3rem;

    .time-bar {
      line-height: 1rem;
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;

      .text {
        margin: 0 0.1rem;
        color: #fff;
      }

      .time-bar-pro {
        width: 5rem;
      }
    }

    .tool-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap;
      width: 100%;
      height: 1rem;

      div {
        flex: 1;
        text-align: center;
        font-size: 0.5rem;
        color: #fff;
      }
    }
  }
}
</style>
  