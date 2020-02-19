/*
数据库源相关接口
 */
// import { get, post, put, deletes } from '../http'

import a from '../../request'
import * as config from '@/config'

let get = a.get
let post = a.post
let put = a.put
let deletes = a.delete
const log = console.log.bind(console)

const DBSource = {
    //获取单个数据库源信息
    getDBSource(DBSourceID) {
        // return get(`/sdm/v1/src-dbs/${DBSourceID}`)
        return get(`${config.URL_GET_DBSOURCE_DETAIL}/${DBSourceID}`)
    },
    //根据数据源ID 得到的模式
    getOneSourceSchems(DBSourceID, params) {
        // return get(`/sdm/v1/src-dbs/querySchemaListBySrcId/${params}`)
        //   let params = {
        //       'offset': 1,
        //       'limit': 5
        //   }
        // return get(`/sdm/v1/src-dbs/querySchemaListBySrcId/${DBSourceID}`, params)
        return get(`${config.URL_GET_DBSOURCE_SCHEMA_LIST}/${DBSourceID}`, params)
    },
    //添加新数据库源
    addSource(params) {
        // return post('/sdm/v1/src-dbs', params)
        return post(`${config.URL_GET_DBSOURCE_DETAIL}`, params)
    },
    // 请求所有的 模式 用于全选
    getAllSchema(ID) {
        return get(`${config.URL_GET_DBSOURCE_SCHEMA_ALL_LIST}/${ID}/?name=`)
    },
// /sdm/v1/src-dbs/{id}
    //添加新数据库源
    editSource(DBSourceid, params) {
        // return put(`/sdm/v1/src-dbs/${DBSourceid}`, params)
        return put(`${config.URL_GET_DBSOURCE_DETAIL}/${DBSourceid}`, params)
    },

    //一个数据库源下所有的任务   获取已发起的同步数据库架构请求列表
    getoneDBSourecAllTask(dbId, srcId, page, pageSize, key) {
        let params = {
            'query': {
                dbId,
                srcId,
                name: key
            },
            'offset': page,
            'limit': pageSize
        }
        // return post('/sdm/v1/load-schema-request/list', params)
        return post(`${config.URL_GET_DBSOURCE_TASK_LIST}`, params)
        // /sdm/v1/load-schema-request/list
    },
    // 获取单个已发起的同步数据库架构请求详细信息
    getFrameTaskDetaile(scheamID) {
        // return get(`/sdm/v1/load-schema-requests/${scheamID}`)
        return get(`${config.URL_GET_DBSOURCE_TASK}/${scheamID}`)
    },
//  删除数据库源前 检测是否关联脱敏任务
    checkIsMaskTask(params) {
        // return get(`/sdm/v1/src-dbs/checkIsMaskTask/${params}`)
        return get(`${config.URL_GET_DBSOURCE_CHECK}/${params}`)
    },
    //  删除数据库源前 检测是否关联脱敏任务
    deleteSource(params) {
        // return deletes(`/sdm/v1/src-dbs/${params}`)
        return deletes(`${config.URL_GET_DBSOURCE_DETAIL}/${params}`)
    },
// /sdm/v1/src-dbs/schema/list/{srcId}

// 获取同步架构界面，获取模式的id和name
    getFrameSchemas(DBSourceID, page) {
        let params = {
            'offset': page,
            'limit': 10
        }
        // return get(`/sdm/v1/src-dbs/schema/list/${DBSourceID}`, params)
        return get(`${config.URL_GET_DBSOURCE_TASK_SCHEAM_LIST}/${DBSourceID}`, params)
    },
   // 获取同步架构界面，获取模式中部分表tables
    getDBSchemaTable(DBID, schemaId, name) {
        let params = {
            name: name
        }
        // return get(`/sdm/v1/remote/tables/${DBID}/${schemaId}`)
        return get(`${config.URL_GET_DBSOURCE_REMOTE_TABLE}/${DBID}/${schemaId}`, params)
    },
    //  新发起一个同步数据库架构请求
    addFrameTask(params) {
        // return post('/sdm/v1/load-schema-requests', params)
        return post(`${config.URL_GET_DBSOURCE_SCHEMA_REQUEST}`, params)
    },
    //  任务同步架构任务单个详情
    getFrameTaskDetailes(ID) {
        // return post('/sdm/v1/load-schema-requests', params)
        return get(`${config.URL_GET_DBSOURCE_SCHEMA_DETAILE}/${ID}`)
    }

}

export default DBSource
