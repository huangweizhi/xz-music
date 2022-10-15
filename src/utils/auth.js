import Cookies from 'js-cookie'

const TOKEN_KEY = 'MUSIC_U'

// token
export const getToken = () => {
  return Cookies.get(TOKEN_KEY)
}
// 由服务端赋值到cookie中
export const setToken = (token) => {
  return Cookies.set(TOKEN_KEY, token)
}
export const removeToken = () => {
  return Cookies.remove(TOKEN_KEY)
}
