<script setup>
import { toRefs } from 'vue'
import { useUserStore } from '@/stores'
import { loginAnonimous, logout } from '@/api'
import { Toast } from 'vant'

const userStore = useUserStore()
const { cookie } = toRefs(userStore)

// 游客登陆
const doLoginAnonimous = async () => {
  const res = await loginAnonimous()
  if(res.code !== 200) return Toast('登陆失败')
  userStore.saveCookie(res.cookie)
  userStore.saveUser({
    id: res.userId
  })
}

// 退出登陆
const doLogout = async () => {
  const res = await logout()
  if(res.code !== 200) return
  userStore.removeUser()
  userStore.removeCookie()
}

</script>

<template>
  <!-- 游客登陆 -->
  <div class="user">
    <van-image
      v-if="cookie"
      round
      width="2rem"
      height="2rem"
      src="./logo.png"
    />
    <div class="btn">
      <van-button v-if="cookie" type="danger" size="small" @click="doLogout">退出</van-button>
      <van-button v-else type="success" size="small" @click="doLoginAnonimous">以游客身份登陆</van-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.user {
  padding: 100px 0;
  text-align: center;
  .btn {
    margin: 0.2rem;
  }
}
</style>
    