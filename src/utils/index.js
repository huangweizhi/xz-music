
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