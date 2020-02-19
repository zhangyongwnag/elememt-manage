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

const DataDic = {

    //获取列表 列表
    getDataDicList(page, pageSize) {
        let params = {
            'fields': ['id', 'name', 'type', 'group_num'],
            'offset': page,
            'limit': pageSize
        }
        return post(config.URL_GET_DATADIC_LIST, params)
    },//获取列表 列表
    getDataDicListSearch(page, pageSize, key) {
        let params = {
            "keyword": key,
            'offset': page,
            'limit': pageSize
        }
        return post(config.URL_GET_DATADIC_LIST_SEARCH, params)
    },
    //  获取数据字典下拉框选项
    getDataDicOption() {
        let params = {
            // 'fields': ['id', 'name']
        }
        return post(config.URL_GET_DATADIC_LIST, params)
    },
    //  获取一个字典下的字典 内容
    getDataDicContentList(id, page, pageSize) {
        let params = {
            "id": id,
            "limit": pageSize,
            "offset": page
        }
        return post(config.URL_GET_DATADIC_LISTONG, params)
    },//  获取一个字典下的字典 内容
    getDataDicContentListSearch(id, page, pageSize, key) {
        let params = {
            "id": id,
            "keyword": key,
            "limit": pageSize,
            "offset": page
        }
        return post(config.URL_GET_DATADIC_GET_CONTENT_SEARCH, params)
    },
    // 添加  数据字典
    addDataDic(params) {
        return post(config.URL_GET_DATADIC_ADD, params)
    },
    // 编辑 前 获取数据字典 名字
    beforeEditDataDic(id) {
        let params = {
            id,
        }
        return post(`${config.URL_GET_DATADIC_BEFOREEDIT}`, params)
    },
    // 编辑 数据字典 名字
    editDataDic(id, name) {
        let params = {
            id,
            name,
        }
        return post(`${config.URL_GET_DATADIC_EDIT}`, params)
    },
    // 删除 数据字典
    deleteDataDic(id) {
        return deletes(`${config.URL_GET_DATADIC_DELETE}/${id}`)
    },
    // 添加数据字典内容前进行获取字典类型和分组数
    getDataDicType(id) {
        let params = {
            id
        }
        return post(config.URL_GET_DATADIC_TYPE, params)
    },
    // 根据内容id 获取单条内容
    getDataDicContent(id) {
        let params = {
            id
        }
        return post(config.URL_GET_DATADIC_GET_CONTENT, params)
    },
    // 字典手动添加-包括普通字典和分组字典
    addDataDicContent(params) {
        return post(config.URL_GET_DATADIC_ADD_CONTENT, params)
    },

    // 编辑  数据字典
    editDataDicContent(params) {
        return post(config.URL_GET_DATADIC_EDIT_CONTENT, params)
    },
    // 删除  数据字典内容
    deleteDataDicContent(id) {
        return deletes(`${config.URL_GET_DATADIC_DELETE_CONTENT}/${id}`)
    },
}

export default DataDic
