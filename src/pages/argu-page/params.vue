<template>
  <div>
    <div>
      ID:{{$route.params.id}}
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
          name:'params',
          params:{
            id:this.$route.params.id
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
