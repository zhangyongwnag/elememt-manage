/*
扫描与脱敏配置中  脱敏算法相关api
 */
// import { get, post, put, deletes } from '../http'
import a from '../../request'
import * as config from '@/config'
let get = a.get
let post = a.post
let put = a.put
let deletes = a.delete
const log = console.log.bind(console)

const DesenAlgo = {
    // 获取列表 算法列表
    getMethodsList (page, pageSize) {
        let params = {
            'fields': ['id', 'name', 'stable'],
            'offset': page,
            'limit': pageSize
        }
        // return post('/sdm/v1/methods/list', params)
        return post(config.URL_GET_DESEN_ALG_LIST, params)
    },
 // 获取列表 算法列表
    getMethodsListSearch (page, pageSize, key) {
        let params = {
            "keyword": key,
            'offset': page,
            'limit': pageSize
        }
        // return post('/sdm/v1/methods/list', params)
        return post(config.URL_GET_DESEN_ALG_LIST_SEARCH, params)
    },

    //得到某单个脱敏算法信息
    getOneMethod(id) {
        let params = {
            id
        }
        // /sdm/v1/methods/listone
        return post(config.URL_GET_DESEN_ALG_LISTONE, params)
    },
    //修改脱敏参数
    editParams(params) {
        // /sdm/v1/methods/saveConf
        return post(config.URL_GET_DESEN_ALG_SAVECONF, params)
    },
    //在线测试
    onlineTest(params) {
        // /sdm/v1/method-test
        return post(config.URL_GET_DESEN_ALG_TEST, params)
    },

}

export default DesenAlgo
