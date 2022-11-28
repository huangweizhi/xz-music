import request from '@/utils/request'

/**
 * 获取轮播图
 * @param {Number} type 0: pc; 1: android; 2: iphone; 3: ipad
 */
 export function getBanner(type=2) {
  return request({
    url: '/banner',
    method: 'get',
    params: {
      type
    }
  })
}

/**
 * 获取热门歌手
 * @param {Number} offset 
 * @param {Number} limit 
 */
 export function getTopArtists(offset=0, limit=15) {
  return request({
    url: '/top/artists',
    method: 'get',
    params: {
      offset,
      limit
    }
  })
}

/**
 * 获取推荐歌单
 * @param {Number} limit 
 */
 export function getPersonalized(limit=15) {
  return request({
    url: '/personalized',
    method: 'get',
    params: {
      limit
    }
  })
}

/**
 * 获取推荐新音乐
 */
 export function getPersonalizedNewsong() {
  return request({
    url: '/personalized/newsong',
    method: 'get'
  })
}

/**
 * 获取歌单分类
 */
 export function getCatlist() {
  return request({
    url: '/playlist/catlist',
    method: 'get'
  })
}

/**
 * 获取歌单( 网友精选碟 )
 * @param {Number} limit 
 * @param {String} order 'new' || 'hot'
 * @param {String} cat '全部'...
 * @returns 
 */
 export function getPalyList(cat='全部', limit=50, order='hot') {
  return request({
    url: '/top/playlist',
    method: 'get',
    params: {
      limit,
      order,
      cat
    }
  })
}

/**
 * 获取歌单详情
 * @param {Number} id 
 * @returns 
 */
 export function getPlayListDetail(id) {
  return request({
    url: '/playlist/detail',
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 获取每日推荐歌单 ( 需要登录 )
 * @returns 
 */
 export function getRecommendSongs() {
  return request({
    url: '/recommend/songs',
    method: 'get'
 })
}

/**
 * 热搜列表(详细)
 * @returns 
 */
 export function searchHotDetail() {
  return request({
    url: '/search/hot/detail',
    method: 'get'
 })
}

/**
 * 搜索
 * @param {String} keywords 
 * @param {String} type 默认1 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 
 * 1009: 电台, 1014: 视频, 1018:综合, 2000:声音
 * @param {String} limit  默认30
 * @param {String} offset  默认0
 * @returns 
 */
 export function search(keywords='', type=1, limit=30, offset=0) {
  return request({
    url: '/cloudsearch',
    method: 'get',
    params: {
      keywords,
      type,
      limit,
      offset
    }
 })
}

/**
 * 获取歌手详情
 * @param {Number} id 
 * @returns 
 */
 export function getArtistDetail(id) {
  return request({
    url: '/artist/detail',
    method: 'get',
    params: {
      id
    }
 })
}

/**
 * 获取歌手单曲
 * @param {Number} id 
 * @returns 
 */
 export function getArtists(id) {
  return request({
    url: '/artists',
    method: 'get',
    params: {
      id
    }
 })
}

/**
 * 获取所有榜单
 * @returns 
 */
 export function getToplist() {
  return request({
    url: '/toplist',
    method: 'get'
 })
}

/**
 * 获取歌词
 * @param {Number} id 歌曲id
 * @returns 
 */
 export function getLyric(id) {
  return request({
    url: '/lyric',
    method: 'get',
    params: {
      id
    }
 })
}

/**
 * 音乐是否可用
 * @param {Number} id 歌曲id
 * @returns 
 */
 export function checkMusic(id) {
  return request({
    url: '/check/music',
    method: 'get',
    params: {
      id
    }
 })
}

/**
 * mv排行
 * @param {Number} limit 取出数量 , 默认为 30
 * @param {String} area 地区,可选值为内地,港台,欧美,日本,韩国,不填则为全部
 * @param {Number} offset 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 * @returns 
 */
 export function getTopMV(limit=30, offset=0, area='') {
  return request({
    url: '/top/mv',
    method: 'get',
    params: {
      limit,
      offset,
      area
    }
 })
}

/**
 * mv 地址
 * @param {Number} id mv的id
 * @param {Number} r 分辨率 默认1080 (可选参数)
 * @returns 
 */
 export function getMVUrl(id, r=720) {
  return request({
    url: '/mv/url',
    method: 'get',
    params: {
      id,
      r
    }
 })
}

/**
 * 获取 mv 数据
 * @param {Number} mvid mv的id
 * @returns 
 */
 export function getMVDetail(mvid) {
  return request({
    url: '/mv/detail',
    method: 'get',
    params: {
      mvid
    }
 })
}

/**
 * 获取 歌曲评论
 * @param {Number} id 音乐 id
 * @param {Number} limit 取出评论数量 , 默认为 20
 * @param {Number} offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param {Number} before 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 * @returns 
 */
 export function getCommentMusic(id, limit=20, offset=0, before) {
  return request({
    url: '/comment/music',
    method: 'get',
    params: {
      id,
      limit,
      offset,
      before
    }
 })
}

/**
 * 获取 楼层评论
 * @param {Number} parentCommentId 楼层评论 id
 * @param {Number} id 资源 id
 * @param {Number} type 资源类型 0: 歌曲1: mv2: 歌单3: 专辑4: 电台节目5: 视频6: 动态7: 电台
 * @param {Number} limit 取出评论数量 , 默认为 20
 * @param {Number} time 分页参数,取上一页最后一项的 time 获取下一页数据
 * @returns 
 */
 export function getCommentFloor(parentCommentId, id, type, limit, time) {
  return request({
    url: '/comment/floor',
    method: 'get',
    params: {
      parentCommentId,
      id,
      limit,
      type,
      time
    }
 })
}