import {
  getBreadCrumbList,
  getMenuByRouter,
  getHomeRoute,
  setTagNavListInLocalstorage,
  getTagNavListFromLocalstorage,
  getRouteTitleHandled,
  routeEqual,
  getNextRoute,
  routeHasExist,
  getMenuByLimit,
  getAuthFromLimitList
} from '@/libs/util'
import router from '@/router'
import routers from '@/router/routers'
import Vue from 'vue'

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute)
}

const homeName = 'Home'

// 根据用户登录状态获取用户信息
let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}

export default {
  state: {
    breadCrumbList: [], // 当前路由面包屑
    tagNavList: [], // 已点击的按钮信息
    homeRoute: {}, // 根路由
    // 如果用户已登录获取权限信息 反之全部路由信息
    accessRoutes: userInfo.data && userInfo.data.length ? userInfo.data : routers,
    userInfo, // 用户信息
    authType: 1 // 路由页面可查看编辑权限
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(state.accessRoutes),
  },
  mutations: {
    setTagNavList(state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
      let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    closeTag(state, route) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      closePage(state, route)
    },
    addTag(state, {route, type = 'unshift'}) {
      let router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    // 设置当前面包屑
    setBreadCrumb(state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
      state.authType = getAuthFromLimitList(route, state.accessRoutes).authType
    },
    // 设置当前根路由
    setHomeRoute(state, routes) {
      state.homeRoute = getHomeRoute(routes, 'Home')
    },
    // 权限处理
    fixAccessRoutes(state, data) {
      // 根据后台数据过滤权限
      let userInfoNew = Object.assign(JSON.parse(localStorage.getItem('userInfo')), {data})
      localStorage.setItem('userInfo', JSON.stringify(userInfoNew))
      state.userInfo = userInfoNew
      state.accessRoutes = data
    },
  },
  actions: {
    // 权限过滤
    async _getAccessList({commit}, data) {
      // 递归处理
      // getMenuByLimit(routersClone,data,keys)
      let keys = Object.keys(data) // 取出key数组
      let routersClone = [...routers] // 浅克隆
      await routersClone.forEach(route => {
        // 过滤不授权限控制的菜单
        if (!route.meta.noAccess) {
          // 过滤后台列表返回的数据，如果匹配显示 反之隐藏
          if (keys.indexOf(route.meta.title) != -1) {
            let obj = {
              showAlways: true,
              hideInMenu: false
            }
            Object.assign(route.meta, obj)
            // 过滤 children
            let list = []
            let value = data[keys[keys.indexOf(route.meta.title)]]
            value.map(item => list.push(item.secondModule))
            route.children.map(item => {
              value.map(row => {
                if (list.includes(item.meta.title)) {
                  item.meta.authType = row.authType
                  item.meta.hideInMenu = false
                } else {
                  item.meta.hideInMenu = true
                }
              })
            })
          } else {
            let obj = {
              hideInMenu: true
            }
            Object.assign(route.meta, obj)
            route.children.map(item => item.meta.hideInMenu = true)
          }
        }
      })
      commit('fixAccessRoutes', routers)
    },
    // 异步加载filter全局过滤器
    _asyncFilter() {
      return new Promise((resolve, reject) => {
        import('../../filter')
          .then(res => {
            // 注册全局过滤器
            Object.keys(res.default).map(key => {
              Vue.filter(key, res.default[key])
            })
            resolve()
          })
          .catch(err => reject(err))
      })
    }
  }
}
