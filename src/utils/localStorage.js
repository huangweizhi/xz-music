import store from 'store'

const path = window.location.pathname.replace('/', '_')
const USER_KEY = path + 'user'
const PLAYING_LIST_KEY = path + 'playing_list'
const PLAYING_INDEX_KEY = path + 'playing_index'
const CYCLE_MODE_KEY = path + 'cycle_mode'


// 用户信息
export const saveUser = (user) => {
  store.set(USER_KEY, user)
}
export const getUser = () => {
  return store.get(USER_KEY)
}
export const removeUser = () => {
  store.remove(USER_KEY)
}

// 播放列表
export const savePlayingList = (playingList) => {
  store.set(PLAYING_LIST_KEY, playingList)
}
export const getPlayingList = () => {
  return store.get(PLAYING_LIST_KEY)
}
export const removePlayingList = () => {
  store.remove(PLAYING_LIST_KEY)
}

// 播放索引
export const savePlayingIndex = (playingIndex) => {
  store.set(PLAYING_INDEX_KEY, playingIndex)
}
export const getPlayingIndex = () => {
  return store.get(PLAYING_INDEX_KEY)
}
export const removePlayingIndex = () => {
  store.remove(PLAYING_INDEX_KEY)
}

// 循环模式
export const saveCycleMode = (cycleMode) => {
  store.set(CYCLE_MODE_KEY, cycleMode)
}
export const getCycleMode = () => {
  return store.get(CYCLE_MODE_KEY)
}
export const removeCycleMode = () => {
  store.remove(CYCLE_MODE_KEY)
}