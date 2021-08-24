import axios from 'axios'
import { Message } from 'element-ui'
// 请求时的拦截
axios.interceptors.request.use((config) => {
  if( localStorage.token){
     config.headers.Authorization =  localStorage.token
  }
  return config;

}, function (error) {
  // 当响应异常时做一些处理
  Message.error('服务器异常，请稍后再试')
  return Promise.reject(error);
});

// 响应时拦截
axios.interceptors.response.use(res => {
  // 返回响应时做一些处理
  if (res.data.status == 'fail') {
    Message.warning(res.data.msg)
    return
  }
  return res
}, function (error) {
  // 当响应异常时做一些处理
  Message.error('服务器异常，请稍后再试')
  return Promise.reject(error);
})

export default {
  get: (url, params, callback) => {
    return axios.get(url, {
      params: params
    }).then(res => {
      callback && callback(res.data)
    }).catch(err => {
        Message.warning(err)
    })
  },
  post: (url, params, callback, config) => {
    return axios.post(url, params, config).then(res => {
      callback && callback(res.data)
    }).catch(err => {
        Message.warning(err)
    })
  }
}
