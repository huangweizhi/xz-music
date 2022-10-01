<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({ data: Array })

/**
 * 播放音乐
 */
const playMusic = (item) => {
  router.push({name: 'playMusic', query: {musicId: item.song.id}})
}

</script>

<template>
  <div class="song-list">
    <div class="item" v-for="item in props.data" :key="item.id">
      <img :src="item.img1v1Url || item.picUrl" />
      <div class="right">
        <div class="right-name">
          <div class="name">{{item.name}}</div>
          <div class="tips">{{item.song.artists[0].name}}</div>
        </div>
        <div class="right-btn">
          <van-icon name="play-circle-o" size="0.5rem" @click="playMusic(item)" />
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
  overflow-x: scroll;

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
  