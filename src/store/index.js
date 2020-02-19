import Vue from 'vue'
import Vuex from 'vuex'
// 修改state时在console打印，便于调试
import createLogger from 'vuex/dist/logger'
import app from './module/app' // 根目录
import socket from './module/socket' // socket
import cancel from './module/cancel' // 路由切换取消pedding中的请求

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {}
const getters = {}
const mutations = {}
const actions = {}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        app,
        socket,
        cancel
    },
    // strict: debug,
    plugins: debug ? [createLogger()] : []
})
