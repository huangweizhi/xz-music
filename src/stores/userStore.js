import { defineStore } from "pinia"
import { getCookie, removeCookie, saveUser, getUser, removeUser } from '@/utils/auth'

export default defineStore("user", {
  state() {
    return {
      // 用户信息
      user: getUser() || {},
      cookie: getCookie() || ''
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
    // 保存cookie
    saveCookie(cookie) {
      this.cookie = cookie
    },
    // 保存cookie
    removeCookie() {
      removeCookie()
      this.cookie = ''
    }
  }
})

