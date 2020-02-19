/*
数据库相关api
 */
// import { get, post, put, deletes } from '../http'
import a from '../../request'
import * as config from '@/config'

let get = a.get
let post = a.post
let put = a.put
let deletes = a.delete
const log = console.log.bind(console)

const DataBase = {
    // 获取所有的数据库列表
    getDBList(page, pageSize, query) {
        let params = {
            'query': {
                "name": query
            },
            'offset': page,
            'limit': pageSize
        }
        return post(config.URL_GET_DATABASES_LIST, params)
    },
    // 得到某个数据库下所有的模式
    getOneDBAllSchemas(DBID, page, pageSize, key) {
        let params = {
            offset: page,
            limit: pageSize,
        }
        if(key) {
            params.name = key
            return get(`${config.URL_GET_DB_SCHEMA}/${DBID}?`, params)
        }
        return get(`${config.URL_GET_DB_SCHEMA}/${DBID}?name=`, params)
    },
    // 得到某个数据库下所有的数据源列表
    getOneDBSource(DBID) {
        return get(`${config.URL_GET_DB_SOURCE}/${DBID}`)
    },
    // 得到某个数据库下所有的数据源列表
    getDBSourceList(DBID, page, pageSize, name) {
        let params = {
            'query': {
                'dbId': DBID,
                name: name
            },
            'offset': page,
            'limit': pageSize
        }
        return post(`${config.URL_GET_DB_SOURCE_LIST}`, params)
    },
    // 获取某个数据库信息 和使用状态
    // "status": 2 // 1： 未关联数据库源  2：关联数据库源但是没有运行的任务 3：有运行的任务
    getOneDBStatus(DBID) {
        return get(`${config.URL_GET_DB_TASK_STATUS}/${DBID}`)
    },
    // 获取某个数据库信息
    getOneDB(DBID) {
        return get(`${config.URL_GET_DB_DETAIL}/${DBID}`)
    },
    //    获取数据库的对象
    getDBObject(dbType) {
        return get(`${config.URL_GET_DB_OBJ}/${dbType}`)
    },
    //    获取数据库表的约束
    getDBConstraint(dbType) {
        return get(`${config.URL_GET_DB_CONSTAINT}/${dbType}`)
    },
    // 添加数据库
    addDB(params) {
        return post(config.URL_GET_DB_DETAIL, params)
    },
    // 编辑数据库
    editDB(DBID, params) {
        return put(`${config.URL_GET_DB_DETAIL}/${DBID}`, params)
    },
    // 删除数据库
    deletDB(DBID) {
        return deletes(`${config.URL_GET_DB_DETAIL}/${DBID}`)
    },
    // 列表中检测数据库的连接状态
    checkoutDBinline(params) {
        return get(`${config.URL_GET_DB_CONNECT_STATUS}?dbIds=[${params}]`)
    },
    // 添加中 编辑中 检测数据库的连通状态
    checkoutDBIsConnect(params) {
        return post(config.URL_GET_DB_STATUS_CHEKC, params)
    },
    // 数据库 删除q前的检测
    CheckoutDBIsCanDelete(DBID) {
        return get(`${config.URL_GET_DB_DELETE_CHECK}/${DBID}`)
    }
}

export default DataBase
