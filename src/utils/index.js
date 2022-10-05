
/**
 * 歌词数据格式转换
 * @param {String} lrc 歌词
 */
export const setLyric = (lrc) => {
  const res = []
  const lrcList = lrc.split('\n')
  const reg = /\[\d{2}:\d{2}\.\d{2,3}\]/
  lrcList.forEach(item => {
    // 取出时间
    let itemdate = item.match(reg)
    if(itemdate) {
      itemdate = itemdate[0]
      itemdate = itemdate.slice(1, -1)
      const timelist = itemdate.split(':')
      // 时间值
      const startTime = parseInt(timelist[0])*60 + parseInt(timelist[1])
      // 歌词
      const lrcstr = item.replace(reg, '')
      res.push({startTime, lrcstr})
    }
  })
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
