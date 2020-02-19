import Vue from 'vue';
import Vuex from 'vuex';
import * as config from '../../config'
import httpCli from '../../api/request'
import websocket from '../../api/websocket'

export default {
  state: {
      scanSocketData:{}, // 扫描任务进度状态
      taskSocketData:{}, // 脱敏任务进度状态
  },
  getters: {

  },
  mutations: {
      _watch(state,data){
          websocket.watch(res => {
              if (res) {
                  let data = JSON.parse(res.data)
                  console.log(data)
                  if (data.code == '1' && data.message == '扫描作业') {
                      state.scanSocketData = data.data
                  }else if (data.code == '2' && data.message == '脱敏作业'){
                      state.taskSocketData = data.data
                  }
              }
          })
      }
  },
  actions: {
      _open({commit}){
          // websocket 实时监听任务状态
          websocket.open(e => {
              commit('_watch',e)
          })
      }
  }
}
