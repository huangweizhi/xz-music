<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { useUserStore } from '@/stores'
import { getQRKey, createQR, checkQR, loginStatus } from '@/api/user'
import { Toast } from 'vant'

const userStore = useUserStore()

// 二维码
const key = ref('')
const QRUrl = ref('')
const QRImg = ref('')
const status = ref('等待扫码')
const timer = ref(null)

onMounted(() => {
  doGetQRKet()
})
onBeforeUnmount(() => {
  if(timer.value) clearInterval(timer.value)
})
onBeforeRouteLeave(() => {
  if(timer.value) clearInterval(timer.value)
})

// 获取二维码key
const doGetQRKet = async () => {
  const res = await getQRKey(new Date().getTime())
  if(res.code !== 200) return Toast(res.message)
  key.value = res.data.unikey
  // 获取二维码
  doCreateQR()
}

// 获取二维码
const doCreateQR = async () => {
  const res = await createQR(key.value, true, new Date().getTime())
  if(res.code !== 200) return Toast(res.message)
  QRUrl.value = res.data.qrurl
  QRImg.value = res.data.qrimg

  // 轮询扫码状态&登陆
  if(timer.value) clearInterval(timer.value)
  timer.value = setInterval(() => {
    doCheckQR()
  }, 3000)
}

// 扫码状态&登陆
const doCheckQR = async () => {
  const res = await checkQR(key.value, new Date().getTime())
  status.value = res.message
  // 二维码过期
  if(res.code == 800) {
    clearInterval(timer.value)
  }
  // 登陆成功
  if(res.code == 803) {
    clearInterval(timer.value)
    // 查询登陆状态
    const res2 = await loginStatus()
    userStore.saveUser({
      account: res2.data.account,
      profile: res2.data.profile
    })
  }
}

</script>

<template>
  <!-- 登陆 -->
  <BetterScroll class="better-scroll">
    <div class="login">
      <div class="desc">请使用网易云app扫码登录</div>
      <img :src="QRImg" />
      <p>{{ status }}</p>
      <div class="btn">
        <van-button round block color="#57BEAD" @click="doGetQRKet">刷新</van-button>
      </div>
    </div>
  </BetterScroll>
</template>

<style lang="less" scoped>
.login {
  width: 100%;
  margin: 1.5rem 0;
  text-align: center;
  .desc {
    margin: 0.4rem;
    font-size: 0.3rem;
  }
  img {
    margin: 0.4rem;
    width: 5rem;
    height: 5rem;
  }
  p {
    margin: 0;
    color: #57AEBD;
  }
  .btn {
    margin: 0.4rem 1rem;
    text-align: center;
  }
}
</style>
    