<script setup>
import { ref, toRefs, watch, computed, defineEmits, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMusicStore, useUserStore } from '@/stores'
import PlayMusicList from './PlayMusicList.vue'
import Comment from '@/components/Comment.vue'
import { getLyric } from '@/api'
import { setLyric, formatSeconds } from '@/utils'
import { Toast } from 'vant'

const router = useRouter()

const musicStore = useMusicStore()
const {playingList, playingIndex, isPlaying, lyricList, currentTime, duration, cycleMode} = toRefs(musicStore)

const userStore = useUserStore()
const { likeMusicIds } = toRefs(userStore)

// 更新 播放 || 暂停 状态
const clickPlay = (isPlaying) => {
  musicStore.updateIsPlaying(isPlaying)
}

// 上一首
const playPreMusic = () => {
  musicStore.playPreMusic()
  if(showLyric.value) {
    getLyricData()
  }
}

// 下一首
const playNextMusic = () => {
  musicStore.playNextMusic()
  if(showLyric.value) {
    getLyricData()
  }
}

// 切换循环模式
const changeCycleMode = () => {
  musicStore.changeCycleMode()
}

// 播放进度控制
const changeCurrentTime = (per) => {
  if(duration.value) {
    musicStore.changeAudioCurrentTime(parseInt(duration.value*(per/100)))
  }
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
// 歌曲切换同时切换歌词
watch(playingIndex, () => {
  if(showLyric.value) {
    getLyricData()
  }
})

// 歌词滚动
const betterScroll = ref(null)
const percentage = ref(0) // 进度条
const pid = ref('0') // 当前歌词被标记的pid
watch(currentTime, ()=> {
  // 歌词滚动
  if(showLyric.value) {
    // 当前歌词
    const p = window.document.querySelector('p.lyric-active')

    // p.offsetTop 当前当前歌词距离父元素顶部距离
    if( p && p.offsetTop) {
      // betterScroll应该滚动的位置
      let y = 260 - p.offsetTop 
      // 下一句触发滚动
      if(pid.value != p.dataset.pid) {
        betterScroll.value.refresh() // 重要
        betterScroll.value.scrollTo(0, y)
      }
      pid.value = p.dataset.pid
    }
  }
  
  // 进度条
  if(currentTime.value && duration.value) {
    percentage.value = parseInt((currentTime.value/duration.value)*100)
  }
  else {
    percentage.value = 0
  }
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

// 歌曲mv
const emits = defineEmits(['clickMV'])
// 点击
const clickMV = async () => {
  const {mvid} = playingList.value[playingIndex.value]
  if(mvid) {
    router.push(`/mv/${mvid}`)
    emits('clickMV', mvid)
  }else {
    Toast('该歌曲没有mv')
  }
}

// 喜欢歌曲列表
const getLikelist = async () => {
  userStore.getLikelistData()
}
// 喜欢或取消喜欢
const likeMusic = async (value) => {
  userStore.likeMusic(playingList.value[playingIndex.value].id, value)
}

// 评论
const commentVisible = ref(false)
const showComment = () => {
  commentVisible.value = true
}
const closeComment = () => {
  commentVisible.value = false
}


onMounted(()=> {
  getLikelist()
})

</script>

<template>
  <div class="music-detail">
    <!-- 背景图片 -->
    <img class="bg-img" :src="playingList[playingIndex].picUrl + '?imageView&thumbnail=750y750' " />

    <!-- 头部 -->
    <div class="header">{{playingList[playingIndex].name}}</div>

    <!-- 唱片 -->
    <div class="disc" v-show="!showLyric" @click="changeContent">
      <img :class="{'disc-needle': true, 'disc-needle-0': !isPlaying}" src="@/assets/img/play/needle-ab.png" />
      <img class="disc-cd" src="@/assets/img/play/disc_circle.png" />
      <img :class="{'disc-ar': true, 'disc-ar-0': !isPlaying, 'disc-ar-1': isPlaying}" 
        :src="playingList[playingIndex].picUrl + '?imageView&thumbnail=750y750' " />
    </div>

    <!-- 歌词 -->
    <div class="lyric" v-show="showLyric" @click="changeContent">
      <BetterScroll class="better-scroll" ref="betterScroll">
        <div class="lyric-content">
          <p v-for="(item, index) in lyricList" :key="index" :data-pid="index"
            :class="{'lyric-active': (currentTime > item.startTime) && (currentTime < item.endTime)} ">
            {{item.lrcstr}}
          </p>
        </div>
      </BetterScroll>
    </div>

    <!-- 底部 -->
    <div class="footer">
      <!-- 按钮 上 -->
      <div class="tool-bar">
        <!-- 喜欢 -->
        <div>
          <svg v-if="likeMusicIds.indexOf(playingList[playingIndex].id) == -1" class="icon" aria-hidden="true" @click="likeMusic(true)">
            <use xlink:href="#icon-xin"></use>
          </svg>
          <svg v-else class="icon" style="color: #57BEAD;" aria-hidden="true" @click="likeMusic(false)">
            <use xlink:href="#icon-xin2"></use>
          </svg>
        </div>
        <!-- MV -->
        <div>
          <svg v-if="playingList[playingIndex].mvid" class="icon" aria-hidden="true" @click="clickMV">
            <use xlink:href="#icon-shipinbofangyingpian"></use>
          </svg>
          <svg v-else class="icon" style="color: #696969;" aria-hidden="true">
            <use xlink:href="#icon-shipinbofangyingpian"></use>
          </svg>
        </div>
        <div></div>
        <!-- 评论 -->
        <div>
          <svg class="icon" aria-hidden="true" @click="showComment">
            <use xlink:href="#icon-xiaoxi"></use>
          </svg>
        </div>
        <!-- 详情 -->
        <div>
          <svg class="icon" aria-hidden="true" @click="">
            <use xlink:href="#icon-gengduo-10"></use>
          </svg>
        </div>
      </div>

      <!-- 进度条 -->
      <div class="time-bar">
        <div class="text">{{getCurrentTime || '00:00'}}</div>
        <div class="time-bar-pro">
          <van-slider v-model="percentage" active-color="#57BEAD" button-size="2px" @change="changeCurrentTime" />
        </div>
        <div class="text">{{getEndTime  || '00:00'}}</div>
      </div>

      <!-- 按钮 下 -->
      <div class="tool-bar">
        <!-- 播放模式 -->
        <div v-if="cycleMode==0">
          <svg class="icon" aria-hidden="true" @click="changeCycleMode">
            <use xlink:href="#icon-xunhuanbofang"></use>
          </svg>
        </div>
        <div v-else>
          <svg class="icon" aria-hidden="true" @click="changeCycleMode">
            <use xlink:href="#icon-danquxunhuan"></use>
          </svg>
        </div>
        <!-- 上一首 -->
        <div>
          <svg class="icon" aria-hidden="true" @click="playPreMusic">
            <use xlink:href="#icon-shangyishoushangyige"></use>
          </svg>
        </div>
        <!-- 暂停状态按钮 -->
        <div v-if="!isPlaying" style="font-size: 0.8rem;">
          <svg class="icon" aria-hidden="true" @click="clickPlay(true)" >
            <use xlink:href="#icon-bofang"></use>
          </svg>
        </div>
        <!-- 播放状态按钮 -->
        <div v-else style="font-size: 0.8rem;">
          <svg class="icon" aria-hidden="true" @click="clickPlay(false)">
            <use xlink:href="#icon-zanting1"></use>
          </svg>
        </div>
        <!-- 下一首 -->
        <div>
          <svg class="icon" aria-hidden="true" @click="playNextMusic">
            <use xlink:href="#icon-xiayigexiayishou"></use>
          </svg>
        </div>
        <!-- 播放列表 -->
        <div>
          <svg class="icon" aria-hidden="true" @click="clickShowPalyList">
            <use xlink:href="#icon-24gf-playlistMusic5"></use>
          </svg>
        </div>
      </div>
    </div>

    <!-- 播放列表 -->
    <!-- 配合BetterScroll滚动 :lock-scroll="false" -->
    <van-action-sheet v-model:show="showPalyList" :lock-scroll="false" title="播放列表">
      <div class="play-list-content">
        <BetterScroll class="better-scroll">
          <PlayMusicList :data="playingList"></PlayMusicList>
        </BetterScroll>
      </div>
    </van-action-sheet>

    <!-- 评论 -->
    <van-popup
      v-if="commentVisible"
      v-model:show="commentVisible"
      position="bottom"
      :style="{ height: '100%' }"
      :lock-scroll="false"
    >
      <div class="top-bar">
        <div class="left">
          <van-icon name="arrow-left" @click="closeComment" />
        </div>
        <div class="center">评论</div>
        <div class="right"></div>
      </div>
      <Comment class="comment" :id="playingList[playingIndex].id" type="music" />
    </van-popup>
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

  .header {
    position: absolute;
    top: 0.1rem;
    height: 1rem;
    width: 5rem;
    margin: 0 1.25rem;
    
    text-align: center;
    line-height: 1rem;
    color: #fff;
    font-size: 0.3rem;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-break: break-all;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .disc {
    display: flex;
    position: relative;
    width: 100%;
    margin-top: 1rem;
    flex-direction: column;
    align-items: center;
    
    .disc-needle {
      width: 1.875rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 13% 7%;
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
    height: calc(100vh - 5.3rem);
    margin: 1.5rem 0;
    text-align: center;
    padding: 0 0.3rem;
    box-sizing: border-box;
    font-size: 0.3rem;

    .lyric-content {
      padding: 50vh 0;
      font-size: 0.36rem;
      color: #808080;
    }

    .lyric-active {
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

.play-list-content {
  height: 7.5rem;
  padding: 0 0.1rem;
  box-sizing: border-box;
  overflow: hidden;
}

.top-bar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  height: 50px;
  width: 100%;
  line-height: 50px;
  color: @textHightColor;
  background-color: @backgroundHightColor;

  .left {
    flex: 1;
    height: 100%;
    text-align: center;
    font-size: 20px;
  }
  .center {
    flex: 5.5;
    height: 100%;
    text-align: center;
    font-size: 18px;
  }
  .right {
    flex: 1;
    height: 100%;
  }
}

.comment {
  height: calc(100% - 50px);
  width: 100%;
}

</style>
  