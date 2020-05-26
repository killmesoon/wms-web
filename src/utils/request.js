import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'
const CAS_AUTH_URL = process.env.VUE_APP_CAS_AUTH_URL
const BASE_API = process.env.VUE_APP_BASE_API
const AUTH_USER_NOT_LOGIN_CODE = 20200
// create an axios instance
const service = axios.create({
  baseURL: BASE_API,
  timeout: 50000,
  withCredentials: true
})

// request interceptor
service.interceptors.request.use(
  config => {
    // config.headers['X-Requested-With'] = 'XMLHttpRequest'
    // if (Object.prototype.toString.call(config.data) === '[object FormData]') {
    //   config.headers['Content-Type'] = 'multipart/form-data'
    // } else {
    //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    //   if (config.method === 'post' || config.method === 'put') {
    //     config.data = qs.stringify(config.data)
    //   }
    // }
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
  response => {
    const headers = response.headers
    if (headers['content-type'] === 'APPLICATION/OCTET-STREAM;charset=UTF-8') {
      return response.data
    }

    const res = response.data
    if (typeof res.rows === 'undefined') {
      if (res.code === AUTH_USER_NOT_LOGIN_CODE) {
        window.location.href = CAS_AUTH_URL
        return res
      }

      if (res.code !== 200) {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 3 * 1000
        })
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res
      }
    } else {
      return res
    }
  },
  error => {
    if (error.code === 'ECONNABORTED') {
      Message({
        message: '请求超时',
        type: 'error',
        duration: 3 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
