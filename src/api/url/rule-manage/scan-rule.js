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

const ScanRule = {
    //获取列表 单个规则列表
    getSingleRulesList(page, pageSize=10) {
        let params = {
            // "query": {
            //     "stable": 1
            // },
            'fields': ['id', 'name', "stable"],
            'offset': page,
            'limit': pageSize
        }
        // return post('/sdm/v1/methods/list', params)
        return post(config.URL_GET_RULES_SINGLE_LIST, params)
    },
    // 获取列表 规则组列表
    getSingleRulesListSearch(page, pageSize, keyword) {
        let params = {
            "keyword": keyword,
            "limit": pageSize,
            "offset": page

        }
        return post(config.URL_GET_RULES_SINGLE_LIST_SEARCH, params)
    },
    //  获取规则下拉框选项 复合式用到
    getSingleRulesOption() {
        let params = {
            // 'fields': ['id', 'name']
        }
        return get(config.URL_GET_RULES_SINGLE_OPTION_LIST, params)
    },
    // 单个规则
    getOneSingleRules(id) {
        let params = {
            id
        }
        return post(config.URL_GET_RULES_SINGLE_ONE, params)
    },
    //添加规则
    addSingleRules(params) {
        return post(config.URL_GET_RULES_SINGLE_ADD, params)
    },
 //添加规则
    editSingleRules(params) {
        return post(config.URL_GET_RULES_SINGLE_EDIT, params)
    },

    //删除single规则
    deleteSingleRules(id) {
        let params = {
            id
        }
        return deletes(config.URL_GET_RULES_SINGLE_DELETE, params)
    },
    //在线扫描测试
    onlineScanTest(params) {
        return post(config.URL_GET_RULES_ONLINE_TEST, params)
    },



    //获取列表 规则组列表
    getGroupRulesList(page, pageSize) {
        let params = {
            "limit": pageSize,
            "offset": page

        }
        return post(config.URL_GET_RULES_GROUP_LIST, params)
    },
    //获取列表 规则组列表
    getGroupRulesListSearch(page, pageSize, keyword) {
        let params = {
            "keyword": keyword,
            "limit": pageSize,
            "offset": page

        }
        return post(config.URL_GET_RULES_GROUP_LIST_SEARCH, params)
    },
    //获取列表 一个规则组
    getOneGroupRules(id, stable) {
        let params = {
            id,
            stable
        }

        return post(config.URL_GET_RULES_GROUP_ONE, params)
    },
    //添加规则组
    addGroupRules(params) {
        // let param = {
        //     "name":"规则组06",
        //     "description":"这是规则组06",
        //     "ruleIds":"12,14,15,19",
        //     "customRuleIds":"22,24,27"
        // }
        return put(config.URL_GET_RULES_GROUP_ADD, params)
    },
    //编辑规则组
    editGroupRules(params) {
        // let param = {
        //     "id":"6",
        //     "name":"规则组06",
        //     "description":"这是规则组06的更新测试",
        //     "ruleIds":"12,14,15,19，21",
        //     "customRuleIds":"22,24,27,29"
        // }
        return post(config.URL_GET_RULES_GROUP_EDIT, params)
    },

    //删除规则组
    deleteGroupRules(id) {
        let params = {
            id: id,
        }

        return deletes(config.URL_GET_RULES_GROUP_DELETE, params)
    },
//
}

export default ScanRule
