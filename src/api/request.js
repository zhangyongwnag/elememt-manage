/**
 * @date 2018/10/18 15:37
 * @author Zyw_20160118
 * @description 封装axios,公共参数,统一处理错误码
 * @query config response error
 * @return response or config
 */

import axios from 'axios'
import qs from 'qs'
import * as config from '../config'
import router from '../router'
import * as common from '../common'
import {Message} from "iview";

axios.interceptors.request.use(config => {
  console.log(config)
  return config
}, error => {
  Message.error('未知错误')
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  if (response.data.code == '200'){
    return response.data
  }else {
    switch (response.data.code) {
      case '210':
        Message.error('提交的信息异常')
      case '303':
        Message.error('未知错误')
        break;
      default:
        Message.error(response.data.msg)
    }
  }
}, error => {
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1){
    Message.error('请求超时')
  }else if (error.message == 'Network Error'){
    Message.error('网络连接异常，请重试')
  }else {
    Message.error('未知错误',error.message)
  }
  return Promise.reject(error)
})

function apiAxios(method,url,params,status) {
  let headers = {}
  method == 'GET' ? headers = {'Content-Type':'application/x-www-form-urlencoded'} : headers = {'Content-Type':'application/json'}
  let httpDefault = {
    method:method,
    url:url,
    data:method == 'POST' || method == 'PUT' || method == 'DELETE' ? params : null,
    params:method == 'GET' ? params : null,
    timeout:status ? 6000 : '',
    headers:headers
  }

  return new Promise((resolve,reject) => {
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
  get: function (url,params,status) {
    return apiAxios('GET',url,params,status || true)
  },
  post: function (url,params,status) {
    return apiAxios('POST',url,params,status || true)
  },
  put: function (url,params,status) {
    return apiAxios('PUT',url,params,status || true)
  },
  delete: function (url,params,status) {
    return apiAxios('DELETE',url,params,status || true)
  },
}


