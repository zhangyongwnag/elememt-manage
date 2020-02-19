/*
文件源相关接口
 */
// import {get, post, put, deletes} from '../request.js'
import a from '../../request'
import * as config from '@/config'

let get = a.get
let post = a.post
let put = a.put
let deletes = a.delete
const log = console.log.bind(console)

const FileSource = {
  //获取列表
  getFileSourceList(type, page) {
    let params = {
      "query": {
        "type": type   //改字段可选，可选内容为：1:数据库 2： 文件 3： DUMP
      },
      "offset": page,
      "limit": 10
    }
    // return post(`/sdm/v1/src/list`, params)
    return post(config.URL_GET_FILE_SOURCE_LIST, params)
  },
  //获取单个 文件源的 文件列表
  getFileSourceDetail(id) {
    // return get(`/sdm/v1/list-template/${id}`)
    return get(`${config.URL_GET_FILE_SOURCE_TEMPLATE}${id}`)
  },
  //获取FTP
  getFtpIFO() {
    // return get(`/sdm/v1/list/ftp/info`)
    return get(config.URL_GET_FILE_SOURCE_FTP_IFO)
  },
  //添加
  addFileSource(name) {
    let params = {
      "type": 2,
      "name": name,
    }
    // return post(`/sdm/v1/src`, params)
    return post(config.URL_GET_FILE_SOURCE_ADD_SRC, params)
  },
  //删除前的检测
  checkFileSourceIsMaskTask(id) {
    // return get(`/sdm/v1/src/check/${id}`)
    return get(`${config.URL_GET_FILE_SOURCE_DELET_CHECK}/${id}`)
  },
  //删除文件源  /sdm/v1/src/{srcId}
  deleteFileSource(id) {
    // return deletes(`/sdm/v1/src/${id}`)
    return deletes(`${config.URL_GET_FILE_SOURCE_DELETE_SRC}/${id}`)
  },

  //============================================文件相关api

  //获取文件列表  /src/list/local/list/{srcId}
  getFileList(srcId, page) {
    let params = {
      "query": {
      "srcId" : srcId,
        // "fileName" : ""可选
    },
      "offset": page,
      "limit": 10
    }
    // return post(`/sdm/v1/src-list/list`, params)
    return post(config.URL_GET_FILE_SOURCE_FILE_LIST, params)
  },
  //获取文件列表 本地的  /src/list/local/list/{srcId}
  getLocalFileList(srcId) {
    // return get(`/sdm/v1/src/list/local/list/${srcId}`)
    return get(config.URL_GET_FILE_SOURCE_LOCAL_LIST+ `/${srcId}`)
  },

  ///sdm/v1/src/list/remote/list/{srcId}
  //获取列表  远程的
  getFileAddList(srcId) {
    // return get(`/sdm/v1/src/list/remote/list/${srcId}`)
    return get(config.URL_GET_FILE_SOURCE_REMOTE_LIST + `/${srcId}`)
  },
  //获取单个
  getFileDetail(id) {
    // let params = {
    //     "query": {
    //         "srcId" : 68517,
    //         "fileName" : ""可选
    //     },
    //     "offset": 1,
    //     "limit": 20
    // }
    // return get(`/sdm/v1/list/${id}`, params)
    return get(config.URL_GET_FILE_SOURCE_FILE + `/${id}`, params)
  },
  ///sdm/v1/list-template/list
  //模板列表
  templateList() {
    let params = {
      "query" : {},
      // "offset" : 1 ,
      // "limit" : 20
    }
    // return post(`/sdm/v1/list-template/list`, params)
    return post(config.URL_GET_FILE_SOURCE_FILE_TEMPLATE_LIST, params)
  },
  //添加
  addFile(params) {
    // return post(`/sdm/v1/src-list`, params)
    return post(config.URL_GET_FILE_SOURCE_ADD_FILE, params)
  },

  //编辑前检测 文件
  checkoutEditFile(id, params) {
    // return put(`/sdm/v1/list-template/${id}`, params)
    return put(config.URL_GET_FILE_SOURCE_CHECKOUT_FILE + `/${id}`, params)
  },

  //编辑文件
  editFile(id, templateId, fileName) {
    let params = {
      "fileName" : fileName,
      // "offset" : 1 ,
      // "limit" : 20
    }
    // return get(`/sdm/v1/src-list/${id}/${templateId}`, params)
    // return get(`/sdm/v1/src-list/${id}/${templateId}`, params)
    return get(config.URL_GET_FILE_SOURCE_EDIT_FILE + `/${id}/${templateId}`, params)
  },

  //删除前检测 文件  /sdm/v1/src-list/check/{fileId}
  checkFileIsMaskTask(fileId) {
    // return get(`/sdm/v1/src-list/check/${fileId}`)
    return get(config.URL_GET_FILE_SOURCE_DELETE_CHECK + `/${fileId}`)
  },
  //删除文件 /sdm/v1/src-list/list/{fileId}
  deleteFile(id) {
    // return deletes(`/sdm/v1/src-list/list/${id}`)
    return deletes(config.URL_GET_FILE_SOURCE_DELETE_file + `/${id}`)
  },


}

export default FileSource
