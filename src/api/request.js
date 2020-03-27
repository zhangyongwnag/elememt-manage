/**
 * @date 2019/12/10 16:37
 * @author Zyw_20160118
 * @description 封装axios,公共参数,统一处理错误码
 * @query config response error
 * @return response or config
 */

import axios from 'axios'
import store from '../store'
import qs from 'qs'
import * as config from '../config'
import router from '../router'
import * as common from '../common'
import {Message, Notification} from 'element-ui'

let requestList = [] // 正在进行中的请求

/**
 * @description 获取token
 */
const getTokenByUserInfo = () => {
  let data = localStorage.getItem('userInfo') || "{}"
  return JSON.parse(data).token || ''
}

/**
 * @description 阻止重复请求
 * @param {array} requestList 全部请求列表
 * @param {string} url 当次请求地址
 * @param {function} cancel 取消请求回调
 * @param {string} error 请求中断抛出的错误信息
 */
const stopRepeatRequest = async (requestList, url, cancel, error) => {
  await requestList.forEach(item => item == url ? cancel(location.host
    + error || '') : '')
  requestList.push(url)
}

/**
 * @description 允许请求继续
 * @param {array} requestList 全部请求列表
 * @param {string} url 当次请求地址
 */
const allowRequest = async (requestList, url) => {
  await requestList.forEach((item, index) => item == url ? requestList.splice(index, 1) : '')
}

axios.interceptors.request.use(config => {
  let cancel
  config.cancelToken = new axios.CancelToken(e => {
    cancel = e
    store.commit('addCancelToken', {
      cancel: e,
      url: location.host + config.url
    })
  })
  // 阻止重复请求，上个请求未完成时，相同的请求不会再次执行
  stopRepeatRequest(requestList, config.url, cancel, `${config.url}---重复请求被中断`)
  return config
}, error => {
  Message.error('未知错误')
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // 相同请求不得在600毫米内重复发送
  setTimeout(() => {
    allowRequest(requestList, response.config.url)
  }, 600)
  // 请求成功业务逻辑
  if (response.data.code == '200') {
    return response.data
  } else {
    switch (response.data.code) {
      case 201:
        Message.warning('您提交的信息异常')
        break
      case 203:
        Notification({
          title: '提示',
          message: response.data.msg,
          type: 'error',
          showClose: true,
        })
        // localStorage.removeItem('userInfo')
        router.replace({path: '/login', query: {userName: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).userName : ''}})
        break;
      // 303 有太多接口异常返回
      // case 303:
      //     Message.error('未知错误')
      //     break
      default:
        Message.error(response.data.msg)
    }
  }
}, error => {
  // axios.isCancel true 取消 false 失败
  // 取消请求的url
  let cancelURL = ''
  if (axios.isCancel(error)) {
    console.warn(error)
    console.table([error.message.split('---')[0]], 'cancel')
    cancelURL = error.message.split('---')[0].replace(location.host, '')
  } else {
    // 请求失败
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      Message.warning('请求超时')
    } else if (error.message == 'Network Error') {
      Message.error('网络连接异常，请重试')
    } else {
      Message.error('未知错误', error.message)
    }
  }

  // 失败或者取消的请求不得在800毫米内重复发送
  setTimeout(() => {
    // 如果请求取消了，error.config为undefined
    axios.isCancel(error) ? allowRequest(requestList, cancelURL) : allowRequest(requestList, error.config.url)
  }, 800)
  return Promise.reject(error)
})

/**
 * formData未处理
 * @param {string} method 请求方式
 * @param {string} url 请求地址
 * @param {obj} params 请求参数
 * @param {boolean} time 如果不存在一直请求，反之10秒结束
 * @param {boolean} status 如果存在表单上传
 */
function apiAxios(method, url, params, time , status) {
  let headers = {
    datafort: 'sdm ' + getTokenByUserInfo()
  }
  method == 'GET' ? headers['Content-Type'] = 'application/x-www-form-urlencoded' : headers['Content-Type'] = 'application/json'
  status ? headers['Content-Type'] = 'multipart/form-data' : ''
  let httpDefault = {
    method: method,
    url: url,
    data: status ? params : (method == 'POST' || method == 'PUT' || method == 'DELETE' ? JSON.stringify(params) : null),
    params: method == 'GET' ? params : null,
    timeout: !time ? 10000 : '',
    headers: headers
  }
  status ? console.log(httpDefault.data.get('file')) : ''

  return new Promise((resolve, reject) => {
    axios(httpDefault)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default {
  get: function (url, params, time, status) {
    return apiAxios('GET', url, params, time || false,status || false)
  },
  post: function (url, params, time,status) {
    return apiAxios('POST', url, params, time || false,status || false)
  },
  put: function (url, params, time,status) {
    return apiAxios('PUT', url, params, time || false,status || false)
  },
  delete: function (url, params,time,status) {
    return apiAxios('DELETE', url, params, time || false,status || false)
  }
}


