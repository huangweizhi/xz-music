import Cookies from 'js-cookie'

const COOKIE_KEY = 'MUSIC_A'
const USER_KEY = 'user'

// cookie
export const getCookie = () => {
  return Cookies.get(COOKIE_KEY)
}

// 由服务端赋值到cookie中
export const setCookie = (cookie) => {
  return Cookies.set(COOKIE_KEY, cookie)
}

export const removeCookie = () => {
  return Cookies.remove(COOKIE_KEY)
}


// 用户信息
export const saveUser = (user) => {
  try {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user))
  }catch(e) {
    window.localStorage.setItem(USER_KEY, '{}')
  }
}

export const getUser = () => {
  try {
    return JSON.parse(window.localStorage.getItem(USER_KEY))
  }catch(e) {
    return {}
  }
}

export const removeUser = () => {
  window.localStorage.removeItem(USER_KEY)
}