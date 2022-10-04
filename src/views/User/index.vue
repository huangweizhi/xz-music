<script setup>
import { toRefs } from 'vue'
import { useUserStore } from '@/stores'
import { loginAnonimous, logout } from '@/api'
import { Toast } from 'vant'

const userStore = useUserStore()
const { user, cookie } = toRefs(userStore)

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
  await logout()
  userStore.deleteCookie()
  userStore.deleteUser()
}

</script>

<template>
  <!-- 游客登陆 -->
  <div class="user">
    <p>用户：{{user.id}}</p>
    <van-button v-if="cookie" type="danger" size="small" @click="doLogout">退出</van-button>
    <van-button v-else type="success" size="small" @click="doLoginAnonimous">以游客身份登陆</van-button>
  </div>
</template>

<style lang="less" scoped>
.user {
  padding: 100px 0;
  text-align: center;
}
</style>
    