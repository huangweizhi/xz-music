import request from '@/utils/request'

/**
 * 发生验证码
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