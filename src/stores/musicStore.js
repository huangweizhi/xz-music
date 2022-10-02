import { defineStore } from "pinia"
import { Toast } from "vant"
 
export default defineStore("music", {
  state() {
    return {
      // 播放器对象
      audio: null,
      // 播放列表
      playingList: [{
        "id": 1985329564,
        "type": 4,
        "name": "上海滩",
        "copywriter": null,
        "picUrl": "http://p1.music.126.net/4cGSMAMWMZ8SSC-LHqWcDA==/109951167917062556.jpg",
        "canDislike": true,
        "trackNumberUpdateTime": null,
        "song": {
          "name": "上海滩",
          "id": 1985329564,
          "position": 0,
          "alias": [],
          "status": 0,
          "fee": 8,
          "copyrightId": 1416737,
          "disc": "01",
          "no": 1,
          "artists": [
            {
              "name": "曹格",
              "id": 2110,
              "picId": 0,
              "img1v1Id": 0,
              "briefDesc": "",
              "picUrl": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
              "img1v1Url": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
              "albumSize": 0,
              "alias": [],
              "trans": "",
              "musicSize": 0,
              "topicPerson": 0
            }
          ],
          "album": {
            "name": "我为歌狂 EP.4 滚石40 粤语精选",
            "id": 152412379,
            "type": "EP",
            "size": 5,
            "picId": 109951167917062560,
            "blurPicUrl": "http://p3.music.126.net/4cGSMAMWMZ8SSC-LHqWcDA==/109951167917062556.jpg",
            "companyId": 0,
            "pic": 109951167917062560,
            "picUrl": "http://p4.music.126.net/4cGSMAMWMZ8SSC-LHqWcDA==/109951167917062556.jpg",
            "publishTime": 1664467200000,
            "description": "",
            "tags": "",
            "company": "滚石唱片",
            "briefDesc": "",
            "artist": {
              "name": "",
              "id": 0,
              "picId": 0,
              "img1v1Id": 0,
              "briefDesc": "",
              "picUrl": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
              "img1v1Url": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
              "albumSize": 0,
              "alias": [],
              "trans": "",
              "musicSize": 0,
              "topicPerson": 0
            },
            "songs": [],
            "alias": [],
            "status": 1,
            "copyrightId": 1416737,
            "commentThreadId": "R_AL_3_152412379",
            "artists": [
              {
                "name": "曹格",
                "id": 2110,
                "picId": 0,
                "img1v1Id": 0,
                "briefDesc": "",
                "picUrl": "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
                "img1v1Url": "http://p3.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
                "albumSize": 0,
                "alias": [],
                "trans": "",
                "musicSize": 0,
                "topicPerson": 0
              }
            ],
            "subType": "录音室版",
            "transName": null,
            "onSale": false,
            "mark": 0,
            "gapless": 0,
            "picId_str": "109951167917062556"
          },
          "starred": false,
          "popularity": 85,
          "score": 85,
          "starredNum": 0,
          "duration": 300549,
          "playedNum": 0,
          "dayPlays": 0,
          "hearTime": 0,
          "sqMusic": {
            "name": null,
            "id": 7593214873,
            "size": 27436367,
            "extension": "flac",
            "sr": 48000,
            "dfsId": 0,
            "bitrate": 730299,
            "playTime": 300549,
            "volumeDelta": -1422
          },
          "hrMusic": {
            "name": null,
            "id": 7593214869,
            "size": 93003371,
            "extension": "flac",
            "sr": 96000,
            "dfsId": 0,
            "bitrate": 2475559,
            "playTime": 300549,
            "volumeDelta": -763
          },
          "ringtone": "",
          "crbt": null,
          "audition": null,
          "copyFrom": "",
          "commentThreadId": "R_SO_4_1985329564",
          "rtUrl": null,
          "ftype": 0,
          "rtUrls": [],
          "copyright": 0,
          "transName": null,
          "sign": null,
          "mark": 0,
          "originCoverType": 0,
          "originSongSimpleData": null,
          "single": 0,
          "noCopyrightRcmd": null,
          "rtype": 0,
          "rurl": null,
          "mvid": 0,
          "bMusic": {
            "name": null,
            "id": 7593214872,
            "size": 4809645,
            "extension": "mp3",
            "sr": 48000,
            "dfsId": 0,
            "bitrate": 128000,
            "playTime": 300549,
            "volumeDelta": 3606
          },
          "mp3Url": null,
          "hMusic": {
            "name": null,
            "id": 7593214870,
            "size": 12024045,
            "extension": "mp3",
            "sr": 48000,
            "dfsId": 0,
            "bitrate": 320000,
            "playTime": 300549,
            "volumeDelta": -763
          },
          "mMusic": {
            "name": null,
            "id": 7593214866,
            "size": 7214445,
            "extension": "mp3",
            "sr": 48000,
            "dfsId": 0,
            "bitrate": 192000,
            "playTime": 300549,
            "volumeDelta": 1860
          },
          "lMusic": {
            "name": null,
            "id": 7593214872,
            "size": 4809645,
            "extension": "mp3",
            "sr": 48000,
            "dfsId": 0,
            "bitrate": 128000,
            "playTime": 300549,
            "volumeDelta": 3606
          },
          "exclusive": false,
          "privilege": {
            "id": 1985329564,
            "fee": 8,
            "payed": 0,
            "st": 0,
            "pl": 128000,
            "dl": 0,
            "sp": 7,
            "cp": 1,
            "subp": 1,
            "cs": false,
            "maxbr": 999000,
            "fl": 128000,
            "toast": false,
            "flag": 4,
            "preSell": false,
            "playMaxbr": 999000,
            "downloadMaxbr": 999000,
            "maxBrLevel": "hires",
            "playMaxBrLevel": "hires",
            "downloadMaxBrLevel": "hires",
            "plLevel": "standard",
            "dlLevel": "none",
            "flLevel": "standard",
            "rscl": null,
            "freeTrialPrivilege": {
              "resConsumable": false,
              "userConsumable": false,
              "listenType": null
            },
            "chargeInfoList": [
              {
                "rate": 128000,
                "chargeUrl": null,
                "chargeMessage": null,
                "chargeType": 0
              },
              {
                "rate": 192000,
                "chargeUrl": null,
                "chargeMessage": null,
                "chargeType": 1
              },
              {
                "rate": 320000,
                "chargeUrl": null,
                "chargeMessage": null,
                "chargeType": 1
              },
              {
                "rate": 999000,
                "chargeUrl": null,
                "chargeMessage": null,
                "chargeType": 1
              },
              {
                "rate": 1999000,
                "chargeUrl": null,
                "chargeMessage": null,
                "chargeType": 1
              }
            ]
          }
        },
        "alg": "hot_server"
      }],
      // 当前播放音乐索引
      playingIndex: 0,
      // 是否正在播放
      isPlaying: false
    }
  },
  actions: {
    /**
     * 更新播放器对象
     */
    updateAudio(audio) {
      this.audio = audio
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
      if(this.playingList.length < 2) return Toast('没有上一首了~')
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
      if(this.playingList.length < 2) return Toast('没有下一首了~')
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
      this.isPlaying = true
    }
  }
})

