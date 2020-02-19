<template>
  <div>
    home
    <el-button @click="addRoutesParams">点击添加params</el-button>
    <el-button @click="addRoutesQuery">点击添加query</el-button>
  </div>
</template>
<script>
  import * as config from '../config'

  export default {
    data() {
      return {}
    },
    methods:{
      addRoutesParams(){
        let id = parseInt(Math.random()*100000)
        let route = {
          name:'params',
          params:{
            id
          },
          meta:{
            title:`动态路由${id}`
          }
        }
        this.$router.push(route)
      },
      addRoutesQuery(){
        let id = parseInt(Math.random()*100000)
        let route = {
          name:'query',
          query:{
            id
          },
          meta:{
            title:`动态路由${id}`
          }
        }
        this.$router.push(route)
      },
    }
  }
</script>
<style scoped>

</style>
