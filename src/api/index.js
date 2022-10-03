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