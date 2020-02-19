
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

const DumpFile = {
    //获取列表 算法列表
    getDumpList (page, pageSize) {
        let params = {
            'fields': ['id', 'name'],
            'offset': page,
            'limit': pageSize
        }
        // return post('/sdm/v1/methods/list', params)
        return post(config.URL_GET_DATADIC_LIST, params)
    },

}

export default DumpFile
