import { defineStore } from "pinia"
import { getToken, removeToken } from '@/utils/auth'
import { saveUser, getUser, removeUser } from '@/utils/localStorage'

export default defineStore("user", {
  state() {
    return {
      // 用户信息
      user: getUser() || {},
      token: getToken() || ''
    }
  },
  actions: {
    // 保存用户信息
    saveUser(user) {
      saveUser(user)
      this.user = user
    },
    // 删除用户信息
    removeUser() {
      removeUser()
      this.user = {}
    },
    // 保存token
    saveToken(token) {
      this.token = token
    },
    // 删除token
    removeToken() {
      removeToken()
      this.token = ''
    }
  }
})

