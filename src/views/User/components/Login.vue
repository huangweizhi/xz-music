<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useUserStore } from '@/stores'
import { login, sentCaptcha } from '@/api/user'
import { Toast } from 'vant'
import { isRightPhone } from '@/utils'

const userStore = useUserStore()

// 手机号&&验证码
const phone = ref('')
const captcha = ref('')
const phoneErrMsg = ref('')
const captchaErrMsg = ref('')

// 倒计时
const timer = ref(null)
const second = ref(0)
onBeforeUnmount(() => {
  if(timer.value) clearInterval(timer.value)
})

// 发送验证码
const sendSms = async () => {
  if(!checkPhone()) return

  const res = await sentCaptcha(phone.value)
  if(res.code !== 200) return Toast(res.message)

  second.value = 10*60
  timer.value = setInterval(() => {
    if(second.value == 1) {
      clearInterval(timer.value)
      timer.value = null
      return
    }
    second.value--
  }, 1000)
}

// 检查提交数据
const checkPhone = () => {
  if(!phone.value) {
    phoneErrMsg.value = '请输入手机号'
    return false
  }
  if(!isRightPhone(phone.value)) {
    phoneErrMsg.value = '手机号格式错误'
    return false
  }
  return true
}
const checkCha = () => {
  if(!captcha.value) {
    captchaErrMsg.value = '请输入验证码'
    return false
  }
  return true
}
const checkInput = () => {
  if(checkPhone() && checkCha()) {
    doLogin() 
  }
}

// 手机短信登陆
const doLogin = async () => {
  const res = await login(phone.value, captcha.value)
  if(res.code !== 200) return Toast(res.message)
  userStore.saveToken(res.token)
  userStore.saveUser({
    account: res.account,
    profile: res.profile,
    bindings: res.bindings
  })
}

</script>

<template>
  <!-- 登陆 -->
  <BetterScroll class="better-scroll">
    <div class="login">
      <div class="desc">请使用网易云账号绑定的手机号登录</div>

      <van-cell-group inset>
        <van-field
          v-model="phone"
          clearable
          required
          label="手机号"
          placeholder="请输入手机号"
          :error-message="phoneErrMsg"
        />

        <van-field
          v-model="captcha"
          center
          clearable
          label="验证码"
          placeholder="请输入验证码"
          :error-message="captchaErrMsg"
        >
          <template #button>
            <van-button round size="small" color="#57BEAD" :disabled="timer!==null" @click="sendSms">
              {{timer? `剩余 (${second}s)` : '发送验证码'}}
            </van-button>
          </template>
        </van-field>

      </van-cell-group>
      
      <div class="btn">
        <van-button round block color="#57BEAD" @click="checkInput">登陆</van-button>
      </div>
    </div>
  </BetterScroll>
</template>

<style lang="less" scoped>
.login {
  width: 100%;
  margin: 2rem 0;
  .desc {
    margin: 0.4rem;
    font-size: 0.3rem;
    text-align: center;
  }
  .btn {
    margin: 0.4rem;
    text-align: center;
  }
}
</style>
    