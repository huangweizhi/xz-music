<script setup>
import { toRefs, onMounted } from 'vue'
import { useUserStore, useMusicStore } from '@/stores'
import { logout, loginStatus } from '@/api/user'
import { Dialog } from 'vant'

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
  if(user.profile) {
    userStore.removeUser()
    userStore.removeToken()
  }
}

onMounted(()=> {
  getLoginStatus()
})

</script>

<template>
  <!-- 用户信息 -->
  <BetterScroll class="better-scroll">
    <div class="user-info">
      <div v-if="user && user.profile">
        <van-image
          round
          width="2rem"
          height="2rem"
          :src="user.profile.avatarUrl"
        />
        <p>{{user.account.userName}}</p>
        <p>{{user.profile.nickname}}</p>
      </div>

      <div class="logout" @click="doLogout">
        <span>退出</span>
      </div>
    </div>
  </BetterScroll>
</template>

<style lang="less" scoped>
.user-info {
  position: relative;
  width: 100%;
  padding: 100px 0;
  text-align: center;
  .logout {
    position: absolute;
    top: 0.4rem;
    right: 0.2rem;
    padding: 0.1rem;
    font-size: 0.3rem;
    color: @theme-color;
  }
}
</style>
    