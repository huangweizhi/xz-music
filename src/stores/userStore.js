import { defineStore } from "pinia"
import { getToken, removeToken } from '@/utils/auth'
import { saveUser, getUser, removeUser } from '@/utils/localStorage'
import { like, getLikelist } from '@/api/user'
import { Toast } from 'vant'

export default defineStore("user", {
  state() {
    return {
      // 用户信息
      user: getUser() || {},
      token: getToken() || '',
      // 用户喜欢的音乐
      likeMusicIds: []
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
    },

    /**
     * 喜欢歌曲列表
     */
    async getLikelistData() {
      if(this.likeMusicIds.length <= 0) {
        const userId = this.user.profile ? this.user.profile.userId : ''
        if(!userId) return []
        
        const res = await getLikelist(userId)
        if(res.code !== 200) return []
        this.likeMusicIds = res.ids
      }
      return this.likeMusicIds
    },
    /**
     * 喜欢或取消喜欢
     * @params id 歌曲id
     * @params value 喜欢/取消喜欢value
     */
    async likeMusic(id, value) {
      const res = await like(id, value)
      if(res.code !== 200) {
        Toast('操作失败')
        return
      }
      // 成功
      if(value) {
        this.likeMusicIds.push(id)
      }else {
        this.likeMusicIds = this.likeMusicIds.filter(item => {
          return item !== id
        })
      }
    }
  }
})

