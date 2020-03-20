<template>
  <div>
    <div style="margin-top: 100px" class="common_flex_align_center">
      <p style="padding: 0 20px">动态路由</p>
      <el-button @click="addRoutesParams" v-waves>点击添加params</el-button>
      <el-button @click="addRoutesQuery" v-waves>点击添加query</el-button>
    </div>
    <div style="margin-top: 100px" class="common_flex_align_center">
      <p style="padding: 0 20px">动态权限控制</p>
      <el-button v-waves @click="changeLimit">切换权限</el-button>
    </div>
  </div>
</template>
<script>
  import * as config from '../config'
  import routers from '../router/routers'

  export default {
    data() {
      return {}
    },
    mounted() {

    },
    methods: {
      addRoutesParams() {
        let id = parseInt(Math.random() * 100000)
        let route = {
          name: 'params',
          params: {
            id
          },
          meta: {
            title: `动态路由${id}`
          }
        }
        this.$router.push(route)
      },
      addRoutesQuery() {
        let id = parseInt(Math.random() * 100000)
        let route = {
          name: 'query',
          query: {
            id
          },
          meta: {
            title: `动态${id}---query路由`
          }
        }
        this.$router.push(route)
      },
      changeLimit(index){
        routers.pop()
        this.$store.state.app.accessRoutes = routers
      }
    }
  }
</script>
<style scoped>

</style>
