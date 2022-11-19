<script setup>
import { toRefs, onMounted, ref } from 'vue'
import { useUserStore, useMusicStore } from '@/stores'
import { logout, loginStatus, getUserPlaylist } from '@/api/user'
import { Dialog } from 'vant'
import PlaylistList from '@/components/PlaylistList.vue'

const userStore = useUserStore()
const musicStore = useMusicStore()

const { user } = toRefs(userStore)

// 退出登陆
const doLogout = () => {
  Dialog.confirm({
    title: '退出登录',
    message:
      '退出登录后，将同时为您删除本地缓存，确定继续吗？',
  })
    .then(async () => {
      // on confirm
      const res = await logout()
      if(res.code !== 200) return
      userStore.removeUser()
      userStore.removeToken()
      musicStore.removePlaying()
    })
    .catch(() => {
      // on cancel
    });
}

// 检查登录状态
const getLoginStatus = async () => {
  const res = await loginStatus()
  if(res.code !== 200) return 
  // 已登录
  if(res.profile) return
  // 没有登录
  if(user.value.profile) {
    userStore.removeUser()
    userStore.removeToken()
  }
}

// 获取用户歌单
const likelist = ref([])
const createlist = ref([])
const collectlist = ref([])
const getUserPlaylistData = async () => {
  const res = await getUserPlaylist(user.value.account.id)
  if(res.code !== 200) return 
  likelist.value = res.playlist.slice(0, 1)
  createlist.value = res.playlist.slice(1).filter(item => {
    return user.value.profile.userId === item.creator.userId
  })
  collectlist.value = res.playlist.slice(1).filter(item => {
    return user.value.profile.userId !== item.creator.userId
  })
}

onMounted(()=> {
  getLoginStatus()
  getUserPlaylistData()
})

</script>

<template>
  <BetterScroll class="better-scroll">
    <!-- 用户信息 -->
    <div class="user-info">
      <div class="content" v-if="user && user.profile">
        <van-image
          round
          width="1.6rem"
          height="1.6rem"
          :src="user.profile.avatarUrl"
        />
        <div class="name">
          <h3>{{user.profile.nickname}}</h3>
        </div>
      </div>

      <div class="logout" @click="doLogout">
        <span>退出</span>
      </div>
    </div>

    <!-- 用户歌单 -->
    <PlaylistList class="playlist" :data="likelist"></PlaylistList>
    <PlaylistList class="playlist" :data="createlist" title="创建歌单" :tool="{'add': true}"></PlaylistList>
    <PlaylistList class="playlist" :data="collectlist" title="收藏歌单" :tool="{'add': false}"></PlaylistList>
  </BetterScroll>
</template>

<style lang="less" scoped>
.user-info {
  position: relative;
  width: 100%;
  margin: 0.3rem 0 0.4rem 0;
  text-align: center;
  background-color: #fff;
  border-radius: 0.2rem;

  .content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.1rem 0.2rem;
    .name h3 {
      margin: 0.2rem;
    }
  }
  .logout {
    position: absolute;
    top: 0.1rem;
    right: 0.2rem;
    padding: 0.1rem;
    font-size: 0.3rem;
    color: @theme-color;
  }
}

.playlist {
  margin-bottom: 0.3rem;
}
</style>
    