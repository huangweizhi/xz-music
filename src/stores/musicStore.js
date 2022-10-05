import { defineStore } from "pinia"
import { Toast } from "vant"
 
export default defineStore("music", {
  state() {
    return {
      // 播放器对象
      audio: null,
      // 播放列表
      playingList: [{
        "id": 1901371647,
        "name": "孤勇者",
        "picUrl": "http://p4.music.126.net/aG5zqxkBRfLiV7A8W0iwgA==/109951166702962263.jpg",
        "artist": "陈奕迅"
      }],
      // 当前播放音乐索引
      playingIndex: 0,
      // 是否正在播放
      isPlaying: false,
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
        this.playNextMusic()
      }, false)

      // 播放进度
      this.audio.addEventListener('timeupdate', () => {
        this.updateCurrentTime()
        this.updateDuration()
      }, false)
    },
    /**
     * 播放||暂停音乐
     */
    updateIsPlaying(isPlaying) {
      this.isPlaying = isPlaying
      // 播放
      if(isPlaying) {
        this.audio.play()
        this.audio.autoplay = true
      }
      // 暂停
      else { 
        this.audio.pause()
      }
    },
    /**
     * 播放歌单音乐
     */
    playListOfMusic(musicList, index) {
      this.playingList = musicList
      this.playingIndex = index
      // 播放
      this.audio.play()
      this.audio.autoplay = true
      this.isPlaying = true
    },
    /**
     * 上一首
     */
    playPreMusic() {
      if(this.playingList.length < 2) {
        return Toast('没有上一首了~')
      }
      if(this.playingIndex > 0) {
        this.playingIndex--
      }else {
        this.playingIndex = this.playingList.length - 1
      }
      this.isPlaying = true
    },
    /**
     * 下一首
     */
    playNextMusic() {
      if(this.playingList.length < 2) {
        return Toast('没有下一首了~')
      }
      if(this.playingIndex < this.playingList.length - 1) {
        this.playingIndex++
      }else {
        this.playingIndex = 0
      }
      this.isPlaying = true
    },
    /**
     * 其中一首
     */
    playIndexOfMusic(index) {
      this.playingIndex = index
      this.audio.play()
      this.audio.autoplay = true
      this.isPlaying = true
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
    }
  }
})

