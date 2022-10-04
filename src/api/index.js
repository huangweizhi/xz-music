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