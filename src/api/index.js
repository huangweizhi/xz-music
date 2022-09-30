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