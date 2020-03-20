import Vue from 'vue';
import Vuex from 'vuex';
import * as config from '../../config'
import httpCli from '../../api/request'

export default {
    state: {
        DBTypeList: [],
        dataBaseList: [],
        columnTypeList: [],
        maskTypeList:[],
        fieldList:[],
    },
    getters: {},
    mutations: {},
    actions: {
        // 获取数据库类型
        getDBType({state, commit}, data) {
            return new Promise((resolve, reject) => {
                httpCli.get(config.URL_GET_DB_TYPE)
                    .then(res => {
                        if (res) {
                            state.DBTypeList = res.data
                            resolve(res.data)
                        } else {
                            reject(res)
                        }
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        // 获取数据源类型
        getSrcType({state, commit}, data) {
            return new Promise((resolve, reject) => {
                httpCli.get(config.URL_GET_DATABASES_SRCTYPE)
                    .then(res => {
                        if (res) {
                            state.dataBaseList = res.data
                            resolve(res.data)
                        } else {
                            reject(res)
                        }
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        /*  // 获取数据库类型
          getDbType({state, commit}, data) {
              return new Promise((resolve, reject) => {
                  httpCli.get(config.URL_GET_DATABASE_TYPES)
                      .then(res => {
                          if (res) {
                              resolve(res.data)
                          } else {
                              reject(res)
                          }
                      })
                      .catch(err => {
                          reject(err)
                      })
              })
          },*/
        // 获取dmp库类型
        getDmpType({state, commit}, data) {
            return new Promise((resolve, reject) => {
                httpCli.get(config.URL_GET_DMP_TYPE)
                    .then(res => {
                        if (res.data) {
                            resolve(res.data)
                        } else {
                            reject(res)
                        }
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        // 获取数据范围
        getSubsetsTables() {
            return new Promise((resolve, reject) => {
                httpCli.get(config.URL_GET_SUBSET_TYPE)
                    .then(res => {
                        if (res) {
                            resolve(res.data)
                        } else {
                            reject(res)
                        }
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        // 获取敏感类型列表
        getChangeColumnType({state}) {
            return new Promise((resolve, reject) => {
                let apply = {
                    'fields': []
                }
                httpCli.post(config.URL_GET_RULES_LIST, apply)
                    .then(res => {
                        if (res) {
                            let list = res.data
                            list.unshift({name: '非敏感', id: 0})
                            state.columnTypeList = list
                            resolve(Object.freeze(res.data))
                        } else {
                            reject(res)
                        }
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        // 获取脱敏类型
        getMaskTypeList({state}) {
            return new Promise((resolve, reject) => {
                httpCli.get(config.URL_GET_MASK_TYPE)
                    .then(res => {
                        if (res) {
                            state.maskTypeList = res.data
                            resolve(res.data)
                        } else {
                            reject(res)
                        }
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        // 获取字段类型列表
        getFieldList({state}) {
            return new Promise((resolve, reject) => {
                httpCli.get(config.URL_GET_COLUMN_TYPE)
                    .then(res => {
                        if (res) {
                            state.fieldList = res.data
                            resolve(Object.freeze(res.data))
                        } else {
                            reject(res)
                        }
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    },
}

