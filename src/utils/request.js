/*
  请求模块
*/
import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 接口的基准路径

})

// 请求拦截器
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  // 判断用户token是否真实有效
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 响应拦截器

export default request
