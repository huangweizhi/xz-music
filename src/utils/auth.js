const COOKIE_KEY = 'cookie'
const USER_KEY = 'user'

// cookie
export const saveCookie = (cookie) => {
  window.localStorage.setItem(COOKIE_KEY, cookie)
}

export const getCookie = () => {
  return window.localStorage.getItem(COOKIE_KEY)
}

export const deleteCookie = () => {
  window.localStorage.removeItem(COOKIE_KEY)
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

export const deleteUser = () => {
  window.localStorage.removeItem(USER_KEY)
}