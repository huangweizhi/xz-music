import request from '@/utils/request'

/**
 * 获取轮播图
 * @param {type} 0: pc; 1: android; 2: iphone; 3: ipad
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
 * @param {offset} 
 * @param {limit} 
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
 * @param {limit} 
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