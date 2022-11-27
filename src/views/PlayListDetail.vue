<script setup>
import { ref, onMounted, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { getPlayListDetail } from '@/api'
import { subscribePlaylist, updatePlaylist } from '@/api/user'
import MusicList from '@/components/MusicList.vue'
import { Toast } from 'vant'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const { user } = toRefs(userStore)
const route = useRoute()

onMounted(() => {
  getPlayListDetailData(route.params.id)
})

// 获取歌单详情
const playListDetail = ref([])
const musiclist = ref([])
const getPlayListDetailData = async (id) => {
  const res = await getPlayListDetail(id)
  if(res.code !== 200) return 
  
  const {playlist} = res
  playListDetail.value = playlist
  musiclist.value = playlist.tracks.map(item => {
    return {
      id: item.id,
      name: item.name,
      picUrl: item.al.picUrl,
      artist: item.ar[0].name,
      mvid: item.mv,
      sq: item.sq,
      fee: item.fee
    }
  })
}

// 收藏歌单
const subscribe = async (id, type=1) => {
  const res = await subscribePlaylist(id, type)
  if(res.code !== 200) return Toast('收藏歌单失败')
  Toast('收藏歌单成功')
}

// 更新歌单
const playlistName = ref('')
const playlistDesc = ref('')
const showUpdate = ref(false)
const showUpdatePlaylist = () => {
  // 数据填充
  playlistName.value = playListDetail.value.name
  playlistDesc.value = playListDetail.value.description
  showUpdate.value = true
}
const finishUpdate = async () => {
  if(!playlistName.value) {
    return Toast('歌单标题不可为空')
  }
  const res = await updatePlaylist(playListDetail.value.id, playlistName.value, playlistDesc.value)
  if(res.code !== 200) return Toast('更新歌单失败')
  Toast('更新歌单成功')
  showUpdate.value = false
  // 更新
  getPlayListDetailData(route.params.id)
}

</script>

<template>
  <div class="play-list-detail">
    <!-- 歌单简介 -->
    <div class="header">
      <van-image
        width="2.6rem"
        height="2.6rem"
        radius="0.3rem"
        :src="playListDetail.coverImgUrl + '?imageView&thumbnail=100y100'"
      />
      <div class="right">
        <div class="title">{{playListDetail.name}}</div>
        <div class="desc">{{playListDetail.description}}</div>

        <div class="tool-bar">
          <!-- 收藏 -->
          <div class="item">
            <svg class="icon" aria-hidden="true" @click="subscribe(playListDetail.id)">
              <use xlink:href="#icon-xin"></use>
            </svg>
            <span>{{playListDetail.subscribedCount}}</span>
          </div>
          <!-- 编辑 -->
          <div class="item" v-if="user.profile && playListDetail.creator && playListDetail.creator.userId === user.profile.userId">
            <svg class="icon" aria-hidden="true" @click="showUpdatePlaylist(playListDetail.id)">
              <use xlink:href="#icon-bianji"></use>
            </svg>
            <span>编辑</span>
          </div>
        </div>
      </div>
    </div>

    <BetterScroll class="better-scroll">
      <!-- 歌单音乐 -->
      <MusicList :data="musiclist"></MusicList>
    </BetterScroll>

    <!-- 更新歌单 -->
    <van-popup
      v-model:show="showUpdate"
      round
      position="bottom"
      :style="{ height: '50%' }"
    >
      <div class="popup-top">
        <div>更新歌单</div>
        <div class="btn" @click="finishUpdate">完成</div>
      </div>
      <van-field v-model="playlistName" label="标题" placeholder="请输入歌单标题" />
      <van-field
        v-model="playlistDesc"
        rows="4"
        autosize
        label="描述"
        type="textarea"
        placeholder="请输入歌单描述"
      />
    </van-popup>
  </div>
</template>

<style lang="less" scoped>
.play-list-detail {
  width: 100%;
  height: 100%;

  .header {
    display: flex;
    max-height: 2.6rem;
    padding: .3rem 0;

    .right {
      width: 4.5rem;
      padding-left: 0.2rem;
      overflow: hidden;
      position: relative;

      .title {
        font-size: 0.3rem;
        color: @textHightColor;
        line-height: 0.6rem;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-break: break-all;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .desc {
        line-height: 0.38rem;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-break: break-all;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
      .tool-bar {
        position: absolute;
        bottom: 0;
        height: 0.4rem;
        width: 100%;

        display: flex;
        align-items: center;

        .item {
          width: 50%;
          font-size: 0.4rem;
          line-height: 0.4rem;
          span {
            font-size: 0.2rem;
            margin-left: 0.1rem;
          }
        }
      }
    }
  }
}

.better-scroll {
  height: calc(100% - 3.2rem);
}

.popup-top {
  margin: 0.2rem 0.4rem 0 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn {
    color: @theme-color;
  }
}
.popup-content {
  margin: 0 0.3rem;
  .van-checkbox {
    margin: 0.2rem 0;
    font-size: 12px;
  }
}

.van-divider {
  margin: 0.2rem 0;
}
</style>
    