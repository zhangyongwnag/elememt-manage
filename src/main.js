import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'
import request from '@/api/request'
import api from '@/api/url'
// import {WBT} from '@/api/websocket'
import element from 'element-ui'
import '@/assets/css/index.css'
import '@/assets/css/common.css'
import '@/assets/css/animate.css'
import '@/assets/font-awesome-4.7.0/css/font-awesome.css'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import * as filter from './filter'

Vue.config.productionTip = false
Vue.prototype.httpCli = request
// Vue.prototype.websocket = new WBT() // 以后不要用类似写法 new实例再引用，否则无效
Vue.prototype.api = api
// 注册全局过滤器
Object.keys(filter).map(key => {
    Vue.filter(key,filter[key])
})

Vue.use(element)

importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render:h => h(App)
})

// 开启socket 后期 登录成功后开启socket
store.dispatch('_open')

// 切换路由时取消正在pending的请求
router.beforeEach(({meta,path},from,next) => {
    store.commit('clearCancelToken')
    next()
})

