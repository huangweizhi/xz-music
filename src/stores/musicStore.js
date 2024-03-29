import { defineStore } from "pinia"
import { Toast } from "vant"
import { checkMusic } from '@/api'
import { 
  savePlayingIndex, getPlayingIndex, removePlayingIndex,
  savePlayingList, getPlayingList, removePlayingList,
  saveCycleMode, getCycleMode
} from '@/utils/localStorage'

const defaultPlayingList = [{
  "id": 1901371647,
  "name": "孤勇者",
  "picUrl": "http://p4.music.126.net/aG5zqxkBRfLiV7A8W0iwgA==/109951166702962263.jpg",
  "artist": "陈奕迅",
  "mvid": 14480854
}]
 
export default defineStore("music", {
  state() {
    return {
      // 播放器对象
      audio: null,
      // 播放列表
      playingList: getPlayingList() || defaultPlayingList,
      // 当前播放音乐索引
      playingIndex: getPlayingIndex() || 0,
      // 是否正在播放
      isPlaying: false,
      // 循环模式 // 0循环 1单曲循环
      cycleMode: getCycleMode() || 0,
      // 歌词
      lyricList: [],
      // 歌曲播放时间
      currentTime: 0,
      // 歌曲时间
      duration: 0
    }
  },
  actions: {
    /**
     * 更新播放器对象
     */
    updateAudio(audio) {
      this.audio = audio

      // 播放结束，播放下一首
      this.audio.addEventListener('ended', () => {
        this.isPlaying = false
        if(this.cycleMode == 0) {
          this.playNextMusic(true)
        }
        if(this.cycleMode == 1) {
          this.playCurrentMusic()
        }
      }, false)

      // 播放进度
      this.audio.addEventListener('timeupdate', () => {
        this.updateCurrentTime()
        this.updateDuration()
      }, false)
    },
    /**
     * 更新播放列表
     */
    updatePlayingList(playingList) {
      playingList = JSON.parse(JSON.stringify(playingList))
      this.playingList = playingList
      this.playingIndex = 0
      // 本地缓存
      savePlayingList(playingList)
      savePlayingIndex(0)
    },
    /**
     * 音乐是否可用
     */
    async checkMusic() {
      const res = await checkMusic(this.playingList[this.playingIndex].id)
      if(res.success) return true
      Toast(res.message)
      this.isPlaying = false
      return false
    },
    /**
     * 播放||暂停 当前音乐
     */
    async updateIsPlaying(isPlay) {
      this.isPlaying = isPlay
      // 播放
      if(isPlay) {
        // 音乐是否可用
        const canUse = await this.checkMusic()
        if(!canUse) return
        // 播放
        this.audio.play()
        this.audio.autoplay = true
      }
      // 暂停
      else { 
        this.audio.pause()
      }
    },
    /**
     * 播放||暂停 歌单音乐
     */
    async playListOfMusic(musicList, index, isPlay) {
      musicList = JSON.parse(JSON.stringify(musicList))
      // 暂停
      if(!isPlay) {
        this.audio.pause()
        this.isPlaying = false
        return
      }

      // 播放
      this.playingList = musicList
      this.playingIndex = index
      // 本地缓存
      savePlayingList(musicList)
      savePlayingIndex(index)

      // 音乐是否可用
      const canUse = await this.checkMusic()
      if(!canUse) return
      
      this.audio.play()
      this.audio.autoplay = true
      this.isPlaying = true
    },
    /**
     * 播放||暂停 播放列表音乐
     */
     async playIndexOfMusic(index, isPlay) {
      // 暂停
      if(!isPlay) {
        this.audio.pause()
        this.isPlaying = false
        return
      }

      // 播放
      this.playingIndex = index
      // 本地缓存
      savePlayingIndex(index)

      // 音乐是否可用
      const canUse = await this.checkMusic()
      if(!canUse) return

      this.audio.play()
      this.audio.autoplay = true
      this.isPlaying = true
    },
    /**
     * 上一首
     */
    async playPreMusic() {
      if(this.playingList.length < 2) {
        return Toast('没有上一首了~')
      }
      if(this.playingIndex > 0) {
        this.playingIndex--
      }else {
        this.playingIndex = this.playingList.length - 1
      }
      // 本地缓存
      savePlayingIndex(this.playingIndex)

      // 音乐是否可用
      const canUse = await this.checkMusic()
      if(!canUse) return

      // 播放
      this.audio.play()
      this.audio.autoplay = true
      this.isPlaying = true
    },
    /**
     * 下一首
     * auto 自动播放下一首
     */
    async playNextMusic(auto=false) {
      if(this.playingList.length < 2) {
        return Toast('没有下一首了~')
      }
      if(this.playingIndex < this.playingList.length - 1) {
        this.playingIndex++
      }else {
        this.playingIndex = 0
      }
      // 本地缓存
      savePlayingIndex(this.playingIndex)

      // 音乐是否可用
      const canUse = await this.checkMusic()
      if(!canUse) {
        if (auto) {
          setTimeout(()=> {
            this.playNextMusic(true)
          }, 1000)
        }
        return
      }

      // 播放
      this.audio.play()
      this.audio.autoplay = true
      this.isPlaying = true
    },
    /**
     * 单曲循环播放
     */
    async playCurrentMusic() {
      // 播放
      this.audio.play()
      this.audio.autoplay = true
      this.isPlaying = true
    },
    /**
     * 切换播放模式
     */
    changeCycleMode() {
      if(this.cycleMode == 0) {
        this.cycleMode = 1
        saveCycleMode(1)
      }else {
        this.cycleMode = 0
        saveCycleMode(0)
      }
    },
    /**
     * 更新歌词
     */
    updateLyricList(lyricList) {
      this.lyricList = lyricList
    },
    /**
     * 更新播放时间
     */
    updateCurrentTime() {
      this.currentTime = this.audio.currentTime
    },
    updateDuration() {
      this.duration = this.audio.duration
    },
    /**
     * 播放进度控制
     */
    changeAudioCurrentTime(currentTime) {
      if(currentTime >=0 && currentTime <= this.audio.duration) {
        this.audio.currentTime = currentTime
      }
    },
    /**
     * 删除缓存的播放列表
     */
    removePlaying() {
      removePlayingList()
      removePlayingIndex()
      this.playingList = defaultPlayingList
      this.playingIndex = 0
    },
    /**
     * 删除播放列表的某一首歌
     */
    removeIndexOfMusic(index) {
      if(this.playingList.length < 2) {
        this.playingList = defaultPlayingList
        this.playingIndex = 0
      }else {
        this.playingList.splice(index, 1)
      }
      // 本地缓存
      savePlayingList(this.playingList)
      savePlayingIndex(this.playingIndex)
    }
  }
})

