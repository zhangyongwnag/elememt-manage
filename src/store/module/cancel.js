import Vue from 'vue';
import Vuex from 'vuex';
import httpCli from '../../api/request'

export default {
    state: {
        cancelTokenArr:[] // 存储cancel token
    },
    mutations: {
        addCancelToken({cancelTokenArr},data){
            cancelTokenArr.push(data)
        },
        clearCancelToken({cancelTokenArr}){
            cancelTokenArr.map(item => {
                item.cancel(`${item.url}---路由切换取消请求`)
                cancelTokenArr = []
            })
        }
    }
}
