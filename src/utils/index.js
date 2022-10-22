
/**
 * 歌词数据格式转换
 * @param {String} lrc 歌词
 */

//  lrc 歌词
//  [00:00.000] 作词 : 王文清
//  [00:30.00]当你说要走 我不想挥手的时候
//  [03:44.00][03:13.00][01:48.00]还是忘了你忘了我

// return
// [
//   {
//       "startTime": 0,
//       "lrcstr": " 作词 : 王文清",
//       "endTime": 1
//   },
//   {
//       "startTime": 30,
//       "lrcstr": "当你说要走 我不想挥手的时候",
//       "endTime": 36
//   },
//   {
//       "startTime": 224,
//       "lrcstr": "还是忘了你忘了我",
//       "endTime": 9999
//   }
// ]
export const setLyric = (lrc) => {
  const res = []
  const lrcList = lrc.split('\n')
  const reg = /\[\d{2}:\d{2}\.\d{2,3}\]/g

  lrcList.forEach(item => {
    // 取出时间
    let dateList = item.match(reg)
    if(dateList) {
      dateList.forEach(itemdate => {
        itemdate = itemdate.slice(1, -1)
        const timelist = itemdate.split(':')
        // 开始时间
        const startTime = parseInt(timelist[0])*60 + parseInt(timelist[1])
        // 歌词
        const lrcstr = item.replace(reg, '')
        res.push({startTime, lrcstr})
      })
    }
  })
  // 歌词排序按startTime属性进行排序
  res.sort((a,b)=>{
    return a.startTime - b.startTime
  })
  // 歌词添加结束时间
  res.forEach((item, index) => {
    if(index < res.length-1) {
      item.endTime = res[index+1].startTime
    }else {
      item.endTime = 9999
    }
  })
  return res
}

/**
 * 秒数转分钟字符串 00：00
 * @param {String} lrc 歌词
 */
export const formatSeconds = (value) => {
  let secondTime = parseInt(value) // 秒
  let minuteTime = 0 // 分
  let hourTime = 0 // 小时
  if(secondTime > 60) { //如果秒数大于60，将秒数转换成整数
    // 获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60)
    // 获取秒数，秒数取余，得到整数秒数
    secondTime = parseInt(secondTime % 60)
    // 如果分钟大于60，将分钟转换成小时
    if(minuteTime > 60) {
      // 获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60)
      // 获取小时后取余的分，获取分钟除以60取佘的分
      minuteTime = parseInt(minuteTime % 60)
    }
  }

  let result = ''
  if( secondTime < 10 && secondTime > 0) {
    result = `00:0${secondTime}`
  }
  if(secondTime >= 10) {
    result = `00:${secondTime}`
  }

  if(minuteTime < 10 && minuteTime > 0) {
    result = `0${minuteTime}:`+result.replace('00:', '')
  }
  if(minuteTime >= 10) {
    result = `${minuteTime}:`+result.replace('00:', '')
  }

  return result
}

/**
 * 验证手机号是否正确
 * @param {String} phone 
 */
export const isRightPhone = (phone) => {
  if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(phone)) {
    return false
  }
  return true
}

/**
 * 控制台打印
 */
 export const consolePrint = () => {
  const info =
`xz-music

《声明》
本站使用了网上公开的api接口，本站不存储任何音频、视频资源，仅为学习使用，请遵守版权要求！！！
如有侵权请联系1136090442@qq.com进行删除。

MIT License
github: https://github.com/huangweizhi/xz-music.git
gitee: https://gitee.com/weizhihuang/xz-music.git
`
  console.info(`%c${info}`, `color:#117a8b`)
}
