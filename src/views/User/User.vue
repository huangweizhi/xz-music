<script setup>
import { toRefs } from 'vue'
import { useUserStore } from '@/stores'
import Login from './components/LoginByQR.vue'
import UserInfo from './components/UserInfo.vue'

const userStore = useUserStore()
const { user } = toRefs(userStore)

</script>

<template>
  <!-- 登陆 -->
  <div class="user">
    <UserInfo v-if="user.profile"></UserInfo>
    <Login v-else></Login>
  </div>
</template>

<style lang="less" scoped>
.user {
  width: 100%;
  height: 100%;
}
</style>
    