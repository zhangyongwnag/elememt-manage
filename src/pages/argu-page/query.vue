<template>
  <div>
    <div>
      ID:{{$route.query.id}}
    </div>
    <div @click="close"><el-button>关闭</el-button></div>
  </div>
</template>

<script>
  import { mapMutations,mapState } from 'vuex'
  export default {
    name: "params",
    data(){
      return{

      }
    },
    methods:{
      ...mapMutations([
        'closeTag'
      ]),
      close(){
        this.closeTag({
          name:'query',
          query:{
            id:this.$route.query.id
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
