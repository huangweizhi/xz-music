<script setup>
import { defineProps, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useMusicStore } from '@/stores'
import { Toast } from 'vant'

const router = useRouter()
const props = defineProps({ data: Array, showImg: Boolean })
const musicStore = useMusicStore()
const { playingList, playingIndex, isPlaying } = toRefs(musicStore)

// 播放||暂停歌单音乐
const playMusic = (musicList, index, isPlay) => {
  musicStore.playListOfMusic(musicList, index, isPlay)
}

// 点击mv
const clickMV = async (item) => {
  const {mvid} = item
  if(mvid) {
    router.push(`/mv/${mvid}`)
  }else {
    Toast('该歌曲没有mv')
  }
}

</script>

<template>
  <div class="song-list">
    <div class="item" v-for="(item, index) in props.data" :key="item.id">
      <div class="left" @click="playMusic(props.data, index, true)">
        <img v-if="props.showImg" :src="item.picUrl + '?imageView&thumbnail=50y50'" />
        <div v-else class="index">{{index+1}}</div>
      </div>

      <div class="right">
        <div class="right-name" @click="playMusic(props.data, index, true)">
          <div class="name">{{item.name}}</div>
          <div class="tips">{{item.artist}}</div>
        </div>
        <div class="right-btn">
          <!-- 正在播放 -->
          <svg class="icon" style="color: #57BEAD;" aria-hidden="true" v-if="item.id == playingList[playingIndex].id && isPlaying">
            <use xlink:href="#icon-a-zhengzaizhibozhengzaibofang"></use>
          </svg>
          <!-- MV -->
          <svg class="icon" aria-hidden="true" v-if="item.mvid" @click="clickMV(item)">
            <use xlink:href="#icon-shipinbofangyingpian"></use>
          </svg>
          <svg class="icon" style="color: #D3D3D3;" aria-hidden="true" v-else>
            <use xlink:href="#icon-shipinbofangyingpian"></use>
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
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.1rem;
      }
      .index {
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 1rem;
        font-size: 0.3rem;
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
        * {
          margin-left: 0.2rem;
        }
      }
    }
  }
}
</style>
  