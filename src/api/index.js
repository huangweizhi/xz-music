import request from '@/utils/request'

/**
 * 游客登陆
 */
export function loginAnonimous() {
  return request({
    url: '/register/anonimous',
    method: 'get'
  })
}

/**
 * 退出登陆
 */
 export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

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
 * 获取获取歌单详情
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
 export function getRecommendSongs(cookie) {
  return request({
    url: '/recommend/songs',
    method: 'get',
    params: {
      cookie
    }
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
 export function getTopMV(limit=30, area='', offset=0) {
  return request({
    url: '/top/mv',
    method: 'get',
    params: {
      limit,
      area,
      offset
    }
 })
}

/**
 * 歌曲相关视频
 * @param {Number} songid 歌曲id
 * @param {Number} mvid mvid 对应的 MV 将会作为第一个返回 (可选参数)
 * @param {Number} limit 取出的 Mlog 数量, 不包含第一个 mvid (可选参数)
 * @returns 
 */
 export function getMusicMV(songid, mvid, limit) {
  const params = { songid }
  if(mvid) params.mvid = mvid
  if(limit) params.limit = limit

  return request({
    url: '/mlog/music/rcmd',
    method: 'get',
    params
 })
}