import axios from 'axios'
import { Toast } from 'vant'

// export const baseURL = process.env.VUE_APP_BASE_API // 本地地址
export const baseURL = 'http://localhost:3000' // 本地地址

// create an axios instance
const service = axios.create({
  baseURL,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})



// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // config.headers['authorization'] = ''
    return config
  },

  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)

  }

)



// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */
  response => {
    const res = response.data
    return res
  },

  error => {
    console.log('err' + error) // for debug
    Toast(error.message)
    return Promise.reject(error)
  }

)

export default service