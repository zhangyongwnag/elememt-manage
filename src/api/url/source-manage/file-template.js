/*
数据库源相关接口
 */
// import { get, post, put, deletes } from '../request.js'
import a from '../../request'
import * as config from '@/config'
let get = a.get
let post = a.post
let put = a.put
let deletes = a.delete
const log = console.log.bind(console)

const FileModal = {
  //获取列表  文件类型
  getFileType () {
    // return post(`/sdm/v1/list/type`)
    return post(config.URL_GET_FILE_MODAL_TYPE_LIST)
  },
    //获取列表
    getFileModalList (page, limit) {
        let params = {
            "query" : {},
            "offset" : page ,
            "limit" : limit
        }
        // return post(`/sdm/v1/list-template/list`, params)
        return post(config.URL_GET_FILE_MODAL_TEMPLE_LIST, params)
    },
    //获取单个信息
    getFileModalDetail (id) {
        // return get(`/sdm/v1/list-template/${id}`)
        return get(`${config.URL_GET_FILE_MODAL_LIST}/${id}`)
    },
        //添加模板  文件
    addFileModal (params) {
        // return post(`/sdm/v1/list-template`, params)
        return post(`${config.URL_GET_FILE_MODAL_LIST}`, params)
    },
    //编辑模板
    editFileModal (id, params) {
        // return put(`/sdm/v1/list-template/${id}`, params)
        return put(`${config.URL_GET_FILE_MODAL_LIST}/${id}`, params)
    },
    //删除前的检测
    checkoutDeleteFileModal (id) {
        // return get(`/sdm/v1/list-template/check/${id}`)
        return get(`${config.URL_GET_FILE_MODAL_CHECK}/${id}`)
    },
    //删除模板
    deleteFileModal (id) {
        // return deletes(`/sdm/v1/list-template/${id}`)
        return deletes(`${config.URL_GET_FILE_MODAL_LIST}/${id}`)
    },

}

export default FileModal
