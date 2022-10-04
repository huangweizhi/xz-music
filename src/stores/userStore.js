import { defineStore } from "pinia"
import { saveCookie, getCookie, deleteCookie, saveUser, getUser, deleteUser } from '@/utils/auth'

export default defineStore("user", {
  state() {
    return {
      // 用户信息
      user: getUser() || {},
      cookie: getCookie() || ''
    }
  },
  actions: {
    // 保存cookie
    saveCookie(cookie) {
      saveCookie(cookie)
      this.cookie = cookie
    },
    // 删除cookie
    deleteCookie() {
      deleteCookie()
      this.cookie = ''
    },
    
    // 保存用户信息
    saveUser(user) {
      saveUser(user)
      this.user = user
    },
    // 删除用户信息
    deleteUser() {
      deleteUser()
      this.user = {}
    }
  }
})

