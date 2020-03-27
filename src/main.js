import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'
import {sync} from 'vuex-router-sync'
import request from '@/api/request'
// import {WBT} from '@/api/websocket'
import element from 'element-ui'
import '@/assets/css/index.css'
import '@/assets/css/common.css'
import '@/assets/css/animate.css'
import '@/assets/font-awesome-4.7.0/css/font-awesome.css'
import importDirective from '@/directive'
import { getAuthFromLimitList } from './libs/util'

Vue.config.productionTip = false
Vue.prototype.httpCli = request
// Vue.prototype.websocket = new WBT() // 以后不要用类似写法 new实例再引用，否则无效

Vue.use(element)

importDirective(Vue)

sync(store, router, {moduleName: 'RouteModule'}) // router关联store对象

new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    render: h => h(App)
})

// 切换路由时取消正在pending的请求
router.beforeEach((to, from, next) => {
    store.commit('clearCancelToken')
    if (localStorage.getItem('userInfo')){
        // let result = getAuthFromLimitList(to,JSON.parse(localStorage.getItem('userInfo')).data)
        // 如果没权限页面 跳到404 注意写法 会出现死循环
        // if (result.hideInMenu && !result.noAccess){
        //     if (to.path == '/404'){
        //         next()
        //     }else {
        //         next('/404')
        //     }
        // }
    }
    // 如果userInfo不存在 跳到登录 注意写法 会出现死循环
    if (!localStorage.getItem('userInfo')){
        if (to.path == '/login'){
            next()
        }else {
            next('/login')
        }
    }else {
        next()
    }
})

router.afterEach(route => {
    // 切换路由，公共添加弹窗数据保留的bug
    // store.commit('reset')
});

// 抽取配置
if (process.env.type == '"test"') {
    request.get('./serve.config.json')
        .then(res => {
            Vue.prototype.BASE_URL = res.data.baseURI
        })
        .catch(err => {
            throw 'serve.config.json is not defined'
        })
}
