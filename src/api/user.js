import request from '@/utils/request'

/**
 * 发送验证码
 * @param {Number} phone 手机号
 */
export function sentCaptcha(phone) {
  return request({
    url: '/captcha/sent',
    method: 'get',
    params: {
      phone
    }
  })
}

/**
 * 手机短信登陆
 * @param {Number} phone 手机号
 * @param {Number} captcha 短信验证码
 */
 export function login(phone, captcha) {
  return request({
    url: '/login/cellphone',
    method: 'get',
    params: {
      phone,
      captcha
    }
  })
}

/**
 * 获取二维码key
 * @param {Number} timestamp 当前时间戳
 */
export function getQRKey(timestamp) {
  return request({
    url: '/login/qr/key',
    method: 'get',
    params: {
      timestamp
    }
  })
}

/**
 * 获取二维码
 * @param {String} key 二维码key
 * @param {String} qrimg 二维码Base64图片
 * @param {Number} timestamp 当前时间戳
 */
export function createQR(key, qrimg, timestamp) {
  return request({
    url: '/login/qr/create',
    method: 'get',
    params: {
      key,
      qrimg,
      timestamp
    }
  })
}

/**
 * 获取二维码扫码状态
 * @param {String} key 二维码key
 * @param {Number} timestamp 当前时间戳
 * 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
 */
export function checkQR(key, timestamp) {
  return request({
    url: '/login/qr/check',
    method: 'get',
    params: {
      key,
      timestamp
    }
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
 * 登陆状态
 */
 export function loginStatus() {
  return request({
    url: '/login/status',
    method: 'get'
  })
}

/**
 * 获取用户歌单
 * @param {Number} uid 用户 id
 * @param {Number} limit 
 * @param {Number} offset 
 */
 export function getUserPlaylist(uid, limit=30, offset=0) {
  return request({
    url: '/user/playlist',
    method: 'get',
    params: {
      uid,
      limit,
      offset
    }
  })
}

/**
 * 新建歌单
 * @param {Number} name 歌单名
 * @param {Number} privacy 是否设置为隐私歌单，默认否，传'10'则设置成隐私歌单
 * @param {String} type 歌单类型,默认'NORMAL',传 'VIDEO'则为视频歌单,传 'SHARED'则为共享歌单
 */
 export function createPlaylist(name, type='NORMAL', privacy) {
  const data = {
    name,
    type
  }
  if(privacy) data.privacy = privacy
  return request({
    url: '/playlist/create',
    method: 'get',
    params: data
  })
}

/**
 * 更新歌单
 * @param {Number} id 歌单id
 * @param {Number} name 歌单名字
 * @param {Number} desc 歌单描述
 * @param {Number} tags 歌单tag ,多个用 `;` 隔开,只能用官方规定标签
 */
 export function updatePlaylist(id, name, desc, tags) {
  return request({
    url: '/playlist/update',
    method: 'get',
    params: {
      id,
      name,
      desc,
      tags
    }
  })
}

/**
 * 删除歌单
 * @param {Number} id 歌单 id,可多个,用逗号隔开
 */
 export function deletePlaylist(id) {
  return request({
    url: '/playlist/delete',
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 收藏/取消收藏歌单
 * @param {Number} t 类型,1:收藏,2:取消收藏
 * @param {Number} id 歌单 id
 */
 export function subscribePlaylist(id, t) {
  return request({
    url: '/playlist/subscribe',
    method: 'get',
    params: {
      id,
      t
    }
  })
}

/**
 * 喜欢音乐
 * @param {Number} id 歌曲 id
 * @param {Boolean} like  默认为 true 即喜欢 , 若传 false, 则取消喜欢
 */
 export function like(id, like=true) {
  return request({
    url: '/like',
    method: 'get',
    params: {
      id,
      like
    }
  })
}

/**
 * 获取喜欢音乐列表
 */
 export function getLikelist(uid) {
  return request({
    url: '/likelist',
    method: 'get',
    params: {
      uid
    }
  })
}